import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPartnersComponent } from './admin-partners.component';
import { PartnerService } from '../../../../services/partner.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdminPartnersComponent', () => {
    let component: AdminPartnersComponent;
    let fixture: ComponentFixture<AdminPartnersComponent>;
    let mockPartnerService: any;

    beforeEach(async () => {
        mockPartnerService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
            create: jasmine.createSpy('create').and.returnValue(of({})),
            update: jasmine.createSpy('update').and.returnValue(of({})),
            delete: jasmine.createSpy('delete').and.returnValue(of({}))
        };

        await TestBed.configureTestingModule({
            imports: [AdminPartnersComponent, HttpClientTestingModule, FormsModule],
            providers: [
                { provide: PartnerService, useValue: mockPartnerService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminPartnersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load partners on init', () => {
        expect(mockPartnerService.getAll).toHaveBeenCalled();
    });
});
