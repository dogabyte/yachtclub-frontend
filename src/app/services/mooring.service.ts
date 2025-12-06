import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mooring } from '../models/mooring.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MooringService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/moorings`;

    getAll(): Observable<Mooring[]> {
        return this.http.get<Mooring[]>(this.apiUrl);
    }

    getById(id: number): Observable<Mooring> {
        return this.http.get<Mooring>(`${this.apiUrl}/${id}`);
    }

    getByZone(zoneName: string): Observable<Mooring[]> {
        return this.http.get<Mooring[]>(`${this.apiUrl}/by-zone/${zoneName}`);
    }

    create(mooring: Mooring): Observable<Mooring> {
        return this.http.post<Mooring>(this.apiUrl, mooring);
    }

    update(id: number, mooring: Mooring): Observable<Mooring> {
        return this.http.put<Mooring>(`${this.apiUrl}/${id}`, mooring);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
