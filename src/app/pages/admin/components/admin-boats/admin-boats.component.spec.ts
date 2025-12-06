import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBoatsComponent } from './admin-boats.component';
import { BoatService } from '../../../../services/boat.service';
import { PartnerService } from '../../../../services/partner.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AdminBoatsComponent', () => {
    let component: AdminBoatsComponent;
    let fixture: ComponentFixture<AdminBoatsComponent>;
    let mockBoatService: any;
    let mockPartnerService: any;

    beforeEach(async () => {
        mockBoatService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
            create: jasmine.createSpy('create').and.returnValue(of({})),
            update: jasmine.createSpy('update').and.returnValue(of({})),
            delete: jasmine.createSpy('delete').and.returnValue(of({}))
        };

        mockPartnerService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([]))
        };

        await TestBed.configureTestingModule({
            imports: [AdminBoatsComponent, HttpClientTestingModule, FormsModule],
            providers: [
                {provide: HTTP_INTERCEPTORS},
                { provide: BoatService, useValue: mockBoatService },
                { provide: PartnerService, useValue: mockPartnerService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminBoatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load boats and partners on init', () => {
        expect(mockBoatService.getAll).toHaveBeenCalled();
        expect(mockPartnerService.getAll).toHaveBeenCalled();
    });
});
