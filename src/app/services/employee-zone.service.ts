import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeZone } from '../models/employee-zone.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeZoneService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/employee-zones`;

    getAll(): Observable<EmployeeZone[]> {
        return this.http.get<EmployeeZone[]>(this.apiUrl);
    }

    create(employeeZone: EmployeeZone): Observable<EmployeeZone> {
        return this.http.post<EmployeeZone>(this.apiUrl, employeeZone);
    }
}
