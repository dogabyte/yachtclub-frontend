import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MooringService } from '../../../../services/mooring.service';
import { ZoneService } from '../../../../services/zone.service';
import { Mooring } from '../../../../models/mooring.model';
import { Zone } from '../../../../models/zone.model';

@Component({
    selector: 'app-admin-moorings',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './admin-moorings.component.html',
    styleUrls: ['./admin-moorings.component.css']
})
export class AdminMooringsComponent implements OnInit {
    moorings: Mooring[] = [];
    zones: Zone[] = [];
    loading = true;
    showForm = false;
    editingMooring: Mooring | null = null;

    formData: Mooring = this.getEmptyMooring();

    private mooringService = inject(MooringService);
    private zoneService = inject(ZoneService);

    ngOnInit(): void {
        this.loadMoorings();
        this.loadZones();
    }

    loadMoorings(): void {
        this.loading = true;
        this.mooringService.getAll().subscribe({
            next: (data) => {
                this.moorings = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading moorings', err);
                this.loading = false;
            }
        });
    }

    loadZones(): void {
        this.zoneService.getAll().subscribe({
            next: (data) => this.zones = data,
            error: (err) => console.error('Error loading zones', err)
        });
    }

    openCreateForm(): void {
        this.editingMooring = null;
        this.formData = this.getEmptyMooring();
        this.showForm = true;
    }

    openEditForm(mooring: Mooring): void {
        this.editingMooring = mooring;
        this.formData = { ...mooring };
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingMooring = null;
    }

    errors: any = {};

    onSubmit(): void {
        this.errors = {};
        const request = this.editingMooring
            ? this.mooringService.update(this.editingMooring.id, this.formData)
            : this.mooringService.create(this.formData);

        request.subscribe({
            next: () => {
                this.loadMoorings();
                this.closeForm();
            },
            error: (err: any) => {
                console.error('Error saving mooring', err);
                if (err.status === 400 && err.error.validationErrors) {
                    this.errors = err.error.validationErrors;
                }
            }
        });
    }

    deleteMooring(id: number): void {
        if (confirm('Are you sure you want to delete this mooring?')) {
            this.mooringService.delete(id).subscribe({
                next: () => this.loadMoorings(),
                error: (err) => console.error('Error deleting mooring', err)
            });
        }
    }

    private getEmptyMooring(): Mooring {
        return {
            id: 0,
            zoneId: '',
            maintenanceService: false
        };
    }
}
