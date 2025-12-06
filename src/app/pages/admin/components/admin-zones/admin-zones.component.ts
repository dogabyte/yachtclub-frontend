import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZoneService } from '../../../../services/zone.service';
import { Zone } from '../../../../models/zone.model';

@Component({
    selector: 'app-admin-zones',
    standalone: true,
    imports: [CommonModule, FormsModule],
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

    onSubmit(): void {
        if (this.editingZone) {
            // Zone update uses name as identifier in service, but let's check if we should use ID or Name
            // Service has update(name, zone). If name changes, this might be tricky.
            // Assuming name is the key or we use ID if backend supports it.
            // Let's use the original name for the update call
            this.zoneService.update(this.editingZone.name, this.formData).subscribe({
                next: () => {
                    this.loadZones();
                    this.closeForm();
                },
                error: (err) => console.error('Error updating zone', err)
            });
        } else {
            this.zoneService.create(this.formData).subscribe({
                next: () => {
                    this.loadZones();
                    this.closeForm();
                },
                error: (err) => console.error('Error creating zone', err)
            });
        }
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
