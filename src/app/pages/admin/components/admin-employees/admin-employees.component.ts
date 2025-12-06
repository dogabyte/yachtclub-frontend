import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../models/employee.model';

@Component({
    selector: 'app-admin-employees',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-employees.component.html',
    styleUrls: ['./admin-employees.component.css']
})
export class AdminEmployeesComponent implements OnInit {
    employees: Employee[] = [];
    loading = true;
    showForm = false;
    editingEmployee: Employee | null = null;

    formData: Employee = this.getEmptyEmployee();

    private employeeService = inject(EmployeeService);

    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees(): void {
        this.loading = true;
        this.employeeService.getAll().subscribe({
            next: (data) => {
                this.employees = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading employees', err);
                this.loading = false;
            }
        });
    }

    openCreateForm(): void {
        this.editingEmployee = null;
        this.formData = this.getEmptyEmployee();
        this.showForm = true;
    }

    openEditForm(employee: Employee): void {
        this.editingEmployee = employee;
        this.formData = { ...employee };
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingEmployee = null;
    }

    onSubmit(): void {
        if (this.editingEmployee) {
            this.employeeService.update(this.editingEmployee.id, this.formData).subscribe({
                next: () => {
                    this.loadEmployees();
                    this.closeForm();
                },
                error: (err) => console.error('Error updating employee', err)
            });
        } else {
            this.employeeService.create(this.formData).subscribe({
                next: () => {
                    this.loadEmployees();
                    this.closeForm();
                },
                error: (err) => console.error('Error creating employee', err)
            });
        }
    }

    deleteEmployee(id: number): void {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employeeService.delete(id).subscribe({
                next: () => this.loadEmployees(),
                error: (err) => console.error('Error deleting employee', err)
            });
        }
    }

    private getEmptyEmployee(): Employee {
        return {
            id: 0,
            code: '',
            name: '',
            address: '',
            phone: '',
            specialty: '',
            username: '',
            password: '',
            role: 'EMPLEADO',
            assignedZones: []
        };
    }
}
