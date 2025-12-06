import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boat } from '../models/boat.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BoatService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/boats`;

    getAll(page: number = 0, size: number = 10): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
    }

    getById(id: number): Observable<Boat> {
        return this.http.get<Boat>(`${this.apiUrl}/${id}`);
    }

    getByPartnerId(partnerId: number): Observable<Boat[]> {
        return this.http.get<Boat[]>(`${this.apiUrl}/partner/${partnerId}`);
    }

    searchByRegistration(registration: string): Observable<Boat> {
        return this.http.get<Boat>(`${this.apiUrl}/search-by-registration/${registration}`);
    }

    create(boat: Boat): Observable<Boat> {
        return this.http.post<Boat>(this.apiUrl, boat);
    }

    update(id: number, boat: Boat): Observable<Boat> {
        return this.http.put<Boat>(`${this.apiUrl}/${id}`, boat);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
