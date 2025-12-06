import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ZoneService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/zones`;

    getAll(): Observable<Zone[]> {
        return this.http.get<Zone[]>(this.apiUrl);
    }

    getById(id: number): Observable<Zone> {
        return this.http.get<Zone>(`${this.apiUrl}/${id}`);
    }

    getByName(name: string): Observable<Zone> {
        return this.http.get<Zone>(`${this.apiUrl}/name/${name}`);
    }

    create(zone: Zone): Observable<Zone> {
        return this.http.post<Zone>(this.apiUrl, zone);
    }

    update(name: string, zone: Zone): Observable<Zone> {
        return this.http.put<Zone>(`${this.apiUrl}/${name}`, zone);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
