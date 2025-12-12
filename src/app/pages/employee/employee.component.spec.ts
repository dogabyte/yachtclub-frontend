import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../../services/employee.service';
import { ZoneService } from '../../services/zone.service';
import { MooringService } from '../../services/mooring.service';
import { AuthService } from '../../core/auth.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EmployeeComponent', () => {
    let component: EmployeeComponent;
    let fixture: ComponentFixture<EmployeeComponent>;
    let mockEmployeeService: any;
    let mockZoneService: any;
    let mockMooringService: any;
    let mockAuthService: any;

    beforeEach(async () => {
        mockEmployeeService = {
            getById: jasmine.createSpy('getById').and.returnValue(of({
                id: 1,
                name: 'Test Emp',
                assignedZones: [{ zoneId: 1 }]
            }))
        };

        mockZoneService = {
            getById: jasmine.createSpy('getById').and.returnValue(of({ id: 1, name: 'Zone A' }))
        };

        mockMooringService = {
            getByZone: jasmine.createSpy('getByZone').and.returnValue(of([]))
        };

        mockAuthService = {
            getUserId: jasmine.createSpy('getUserId').and.returnValue(1)
        };

        await TestBed.configureTestingModule({
            imports: [EmployeeComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: EmployeeService, useValue: mockEmployeeService },
                { provide: ZoneService, useValue: mockZoneService },
                { provide: MooringService, useValue: mockMooringService },
                { provide: AuthService, useValue: mockAuthService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EmployeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch employee and zone data on init', () => {
        expect(mockEmployeeService.getById).toHaveBeenCalledWith(1);
        expect(mockZoneService.getById).toHaveBeenCalledWith(1);
        expect(mockMooringService.getByZone).toHaveBeenCalledWith('Zone A');
    });
});
