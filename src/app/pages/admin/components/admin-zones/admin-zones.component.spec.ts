import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminZonesComponent } from './admin-zones.component';
import { ZoneService } from '../../../../services/zone.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdminZonesComponent', () => {
    let component: AdminZonesComponent;
    let fixture: ComponentFixture<AdminZonesComponent>;
    let mockZoneService: any;

    beforeEach(async () => {
        mockZoneService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
            create: jasmine.createSpy('create').and.returnValue(of({})),
            update: jasmine.createSpy('update').and.returnValue(of({})),
            delete: jasmine.createSpy('delete').and.returnValue(of({}))
        };

        await TestBed.configureTestingModule({
            imports: [AdminZonesComponent, FormsModule],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: ZoneService, useValue: mockZoneService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminZonesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load zones on init', () => {
        expect(mockZoneService.getAll).toHaveBeenCalled();
    });
});
