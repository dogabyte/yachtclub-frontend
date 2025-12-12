import { Component, OnInit, inject } from '@angular/core';

import { BoatService } from '../../services/boat.service';
import { PartnerService } from '../../services/partner.service';
import { Boat } from '../../models/boat.model';
import { Partner } from '../../models/partner.model';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'app-partner',
    standalone: true,
    imports: [],
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
    boats: Boat[] = [];
    partner: Partner | null = null;
    loading = true;

    private boatService = inject(BoatService);
    private partnerService = inject(PartnerService);
    private authService = inject(AuthService);

    ngOnInit(): void {
        const userId = this.authService.getUserId();

        if (userId) {
            this.loadPartnerData(userId);
            this.loadBoats(userId);
        } else {
            console.error('No user logged in');
            this.loading = false;
        }
    }

    private loadPartnerData(id: number): void {
        this.partnerService.getById(id).subscribe({
            next: (data) => {
                this.partner = data;
            },
            error: (err) => {
                console.error('Error fetching partner data', err);
            }
        });
    }

    private loadBoats(id: number): void {
        this.boatService.getByPartnerId(id).subscribe({
            next: (data) => {
                this.boats = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching boats', err);
                this.loading = false;
            }
        });
    }

    logout(): void {
        this.authService.logout();
        window.location.reload();
    }
}
