import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerComponent } from './partner.component';
import { BoatService } from '../../services/boat.service';
import { PartnerService } from '../../services/partner.service';
import { AuthService } from '../../core/auth.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartnerComponent', () => {
    let component: PartnerComponent;
    let fixture: ComponentFixture<PartnerComponent>;
    let mockBoatService: any;
    let mockPartnerService: any;
    let mockAuthService: any;

    beforeEach(async () => {
        mockBoatService = {
            getByPartnerId: jasmine.createSpy('getByPartnerId').and.returnValue(of([]))
        };

        mockPartnerService = {
            getById: jasmine.createSpy('getById').and.returnValue(of({ name: 'Test', lastName: 'User' }))
        };

        mockAuthService = {
            getUserId: jasmine.createSpy('getUserId').and.returnValue(1)
        };

        await TestBed.configureTestingModule({
            imports: [PartnerComponent, HttpClientTestingModule],
            providers: [
                { provide: BoatService, useValue: mockBoatService },
                { provide: PartnerService, useValue: mockPartnerService },
                { provide: AuthService, useValue: mockAuthService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PartnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch boats and partner data on init', () => {
        expect(mockBoatService.getByPartnerId).toHaveBeenCalledWith(1);
        expect(mockPartnerService.getById).toHaveBeenCalledWith(1);
    });
});
