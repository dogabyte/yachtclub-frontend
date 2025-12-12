import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ZoneService } from '../../../../services/zone.service';
import { Zone } from '../../../../models/zone.model';

@Component({
    selector: 'app-admin-zones',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './admin-zones.component.html',
    styleUrls: ['./admin-zones.component.css']
})
export class AdminZonesComponent implements OnInit {
    zones: Zone[] = [];
    loading = true;
    showForm = false;
    editingZone: Zone | null = null;

    formData: Zone = this.getEmptyZone();

    private zoneService = inject(ZoneService);

    ngOnInit(): void {
        this.loadZones();
    }

    loadZones(): void {
        this.loading = true;
        this.zoneService.getAll().subscribe({
            next: (data) => {
                this.zones = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading zones', err);
                this.loading = false;
            }
        });
    }

    openCreateForm(): void {
        this.editingZone = null;
        this.formData = this.getEmptyZone();
        this.showForm = true;
    }

    openEditForm(zone: Zone): void {
        this.editingZone = zone;
        this.formData = { ...zone };
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingZone = null;
    }

    errors: any = {};

    onSubmit(): void {
        this.errors = {};
        const request = this.editingZone
            ? this.zoneService.update(this.editingZone.name, this.formData)
            : this.zoneService.create(this.formData);

        request.subscribe({
            next: () => {
                this.loadZones();
                this.closeForm();
            },
            error: (err: any) => {
                console.error('Error saving zone', err);
                if (err.status === 400 && err.error.validationErrors) {
                    this.errors = err.error.validationErrors;
                }
            }
        });
    }

    deleteZone(id: number): void {
        if (confirm('Are you sure you want to delete this zone?')) {
            this.zoneService.delete(id).subscribe({
                next: () => this.loadZones(),
                error: (err) => console.error('Error deleting zone', err)
            });
        }
    }

    private getEmptyZone(): Zone {
        return {
            id: 0,
            name: '',
            boatType: '',
            depth: 0,
            width: 0,
            boatCapacity: 0
        };
    }
}
