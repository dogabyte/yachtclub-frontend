import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoatService } from '../../../../services/boat.service';
import { PartnerService } from '../../../../services/partner.service';
import { Boat } from '../../../../models/boat.model';
import { Partner } from '../../../../models/partner.model';

@Component({
    selector: 'app-admin-boats',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-boats.component.html',
    styleUrls: ['./admin-boats.component.css']
})
export class AdminBoatsComponent implements OnInit {
    boats: Boat[] = [];
    partners: Partner[] = [];
    loading = true;
    showForm = false;
    editingBoat: Boat | null = null;

    formData: Boat = this.getEmptyBoat();

    private boatService = inject(BoatService);
    private partnerService = inject(PartnerService);

    ngOnInit(): void {
        this.loadBoats();
        this.loadPartners();
    }

    loadBoats(): void {
        this.loading = true;
        this.boatService.getAll().subscribe({
            next: (data) => {
                // Handle pagination response if needed, assuming simple list for now or extracting content
                this.boats = Array.isArray(data) ? data : (data.content || []);
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading boats', err);
                this.loading = false;
            }
        });
    }

    loadPartners(): void {
        this.partnerService.getAll().subscribe({
            next: (data) => this.partners = data,
            error: (err) => console.error('Error loading partners', err)
        });
    }

    openCreateForm(): void {
        this.editingBoat = null;
        this.formData = this.getEmptyBoat();
        this.showForm = true;
    }

    openEditForm(boat: Boat): void {
        this.editingBoat = boat;
        this.formData = { ...boat };
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingBoat = null;
    }

    onSubmit(): void {
        if (this.editingBoat && this.editingBoat.id) {
            this.boatService.update(this.editingBoat.id, this.formData).subscribe({
                next: () => {
                    this.loadBoats();
                    this.closeForm();
                },
                error: (err) => console.error('Error updating boat', err)
            });
        } else {
            this.boatService.create(this.formData).subscribe({
                next: () => {
                    this.loadBoats();
                    this.closeForm();
                },
                error: (err) => console.error('Error creating boat', err)
            });
        }
    }

    deleteBoat(id: number): void {
        if (confirm('Are you sure you want to delete this boat?')) {
            this.boatService.delete(id).subscribe({
                next: () => this.loadBoats(),
                error: (err) => console.error('Error deleting boat', err)
            });
        }
    }

    getOwnerName(ownerId: number): string {
        const partner = this.partners.find(p => p.id === ownerId);
        return partner ? `${partner.name} ${partner.lastName}` : 'Unknown';
    }

    private getEmptyBoat(): Boat {
        return {
            id: 0,
            ownerId: 0,
            vesselNumber: '',
            name: '',
            type: '',
            length: 0,
            beam: 0,
            draft: 0
        };
    }
}
