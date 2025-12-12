import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEmployeesComponent } from './admin-employees.component';
import { EmployeeService } from '../../../../services/employee.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdminEmployeesComponent', () => {
    let component: AdminEmployeesComponent;
    let fixture: ComponentFixture<AdminEmployeesComponent>;
    let mockEmployeeService: any;

    beforeEach(async () => {
        mockEmployeeService = {
            getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
            create: jasmine.createSpy('create').and.returnValue(of({})),
            update: jasmine.createSpy('update').and.returnValue(of({})),
            delete: jasmine.createSpy('delete').and.returnValue(of({}))
        };

        await TestBed.configureTestingModule({
            imports: [AdminEmployeesComponent, FormsModule],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: EmployeeService, useValue: mockEmployeeService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminEmployeesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load employees on init', () => {
        expect(mockEmployeeService.getAll).toHaveBeenCalled();
    });
});
