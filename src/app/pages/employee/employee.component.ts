import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { ZoneService } from '../../services/zone.service';
import { MooringService } from '../../services/mooring.service';
import { AuthService } from '../../core/auth.service';
import { Employee } from '../../models/employee.model';
import { Zone } from '../../models/zone.model';
import { Mooring } from '../../models/mooring.model';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface ZoneData extends Zone {
    moorings: Mooring[];
}

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    employee: Employee | null = null;
    zonesData: ZoneData[] = [];
    loading = true;

    private employeeService = inject(EmployeeService);
    private zoneService = inject(ZoneService);
    private mooringService = inject(MooringService);
    private authService = inject(AuthService);

    ngOnInit(): void {
        const userId = this.authService.getUserId();

        if (userId) {
            this.loadEmployeeData(userId);
        } else {
            console.error('No user logged in');
            this.loading = false;
        }
    }

    private loadEmployeeData(id: number): void {
        this.employeeService.getById(id).pipe(
            switchMap(employee => {
                this.employee = employee;
                if (!employee.assignedZones || employee.assignedZones.length === 0) {
                    return of([]);
                }

                // Create an array of observables to fetch zone details and moorings for each assigned zone
                const zoneRequests = employee.assignedZones.map(ez =>
                    this.zoneService.getById(ez.zoneId).pipe(
                        switchMap(zone =>
                            this.mooringService.getByZone(zone.name).pipe(
                                map(moorings => ({ ...zone, moorings } as ZoneData)),
                                catchError(() => of({ ...zone, moorings: [] } as ZoneData))
                            )
                        ),
                        catchError(() => of(null))
                    )
                );

                return forkJoin(zoneRequests);
            })
        ).subscribe({
            next: (zones) => {
                this.zonesData = zones.filter((z): z is ZoneData => z !== null);
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching employee data', err);
                this.loading = false;
            }
        });
    }

    logout(): void {
        this.authService.logout();
        window.location.reload();
    }
}
