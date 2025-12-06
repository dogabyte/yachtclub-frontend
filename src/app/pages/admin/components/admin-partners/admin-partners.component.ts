import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerService } from '../../../../services/partner.service';
import { Partner } from '../../../../models/partner.model';

@Component({
    selector: 'app-admin-partners',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-partners.component.html',
    styleUrls: ['./admin-partners.component.css']
})
export class AdminPartnersComponent implements OnInit {
    partners: Partner[] = [];
    loading = true;
    showForm = false;
    editingPartner: Partner | null = null;

    // Form model
    formData: Partner = this.getEmptyPartner();

    private partnerService = inject(PartnerService);

    ngOnInit(): void {
        this.loadPartners();
    }

    loadPartners(): void {
        this.loading = true;
        this.partnerService.getAll().subscribe({
            next: (data) => {
                this.partners = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading partners', err);
                this.loading = false;
            }
        });
    }

    openCreateForm(): void {
        this.editingPartner = null;
        this.formData = this.getEmptyPartner();
        this.showForm = true;
    }

    openEditForm(partner: Partner): void {
        this.editingPartner = partner;
        this.formData = { ...partner };
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingPartner = null;
    }

    // Error handling
    errors: any = {};

    onSubmit(): void {
        console.log('Submitting form...', this.formData);
        this.errors = {}; // Reset errors on submit logic

        const request = this.editingPartner
            ? this.partnerService.update(this.editingPartner.id, this.formData)
            : this.partnerService.create(this.formData);

        request.subscribe({
            next: () => {
                console.log('Success!');
                this.loadPartners();
                this.closeForm();
            },
            error: (err) => {
                console.error('Error submitting partner', err);
                if (err.status === 400 && err.error.validationErrors) {
                    this.errors = err.error.validationErrors;
                } else {
                    alert('Error inesperado: ' + (err.error?.message || err.message || 'Server error'));
                }
            }
        });
    }

    deletePartner(id: number): void {
        if (confirm('Are you sure you want to delete this partner?')) {
            this.partnerService.delete(id).subscribe({
                next: () => this.loadPartners(),
                error: (err) => console.error('Error deleting partner', err)
            });
        }
    }

    private getEmptyPartner(): Partner {
        return {
            id: 0,
            name: '',
            lastName: '',
            address: '',
            dni: '',
            phone: '',
            registrationDate: new Date().toISOString().split('T')[0],
            username: '',
            password: '',
            role: 'PARTNER'
        };
    }
}
