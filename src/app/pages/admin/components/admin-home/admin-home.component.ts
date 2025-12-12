import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PartnerService } from '../../../../services/partner.service';
import { BoatService } from '../../../../services/boat.service';
import { EmployeeService } from '../../../../services/employee.service';
import { ZoneService } from '../../../../services/zone.service';
import { MooringService } from '../../../../services/mooring.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mb-10">
      <h1 class="text-3xl font-extrabold text-indigo-900 tracking-tight">Panel de Control</h1>
      <p class="mt-2 text-lg text-indigo-600">Resumen del sistema Yacht Club Argentino</p>
    </div>
    
    @if (loading) {
      <div class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900"></div>
      </div>
    }
    
    @if (!loading) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Partners Card -->
        <a routerLink="/admin/partners" class="block bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-100 uppercase tracking-wider">Socios</p>
              <p class="text-4xl font-extrabold text-white mt-2">{{ stats.partners }}</p>
            </div>
            <div class="p-4 bg-white bg-opacity-20 rounded-full">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
          </div>
        </a>
        <!-- Boats Card -->
        <a routerLink="/admin/boats" class="block bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-teal-100 uppercase tracking-wider">Embarcaciones</p>
              <p class="text-4xl font-extrabold text-white mt-2">{{ stats.boats }}</p>
            </div>
            <div class="p-4 bg-white bg-opacity-20 rounded-full">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 7 4 8 7 8 0 0 3.5 0 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 7 3 8 6 8z"></path></svg>
            </div>
          </div>
        </a>
        <!-- Employees Card -->
        <a routerLink="/admin/employees" class="block bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-emerald-100 uppercase tracking-wider">Empleados</p>
              <p class="text-4xl font-extrabold text-white mt-2">{{ stats.employees }}</p>
            </div>
            <div class="p-4 bg-white bg-opacity-20 rounded-full">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
          </div>
        </a>
        <!-- Zones Card -->
        <a routerLink="/admin/zones" class="block bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-orange-100 uppercase tracking-wider">Zonas</p>
              <p class="text-4xl font-extrabold text-white mt-2">{{ stats.zones }}</p>
            </div>
            <div class="p-4 bg-white bg-opacity-20 rounded-full">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
          </div>
        </a>
        <!-- Moorings Card -->
        <a routerLink="/admin/moorings" class="block bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-indigo-100 uppercase tracking-wider">Amarres</p>
              <p class="text-4xl font-extrabold text-white mt-2">{{ stats.moorings }}</p>
            </div>
            <div class="p-4 bg-white bg-opacity-20 rounded-full">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v8m0 0a3 3 0 100 6 3 3 0 000-6zm0 0V2m0 14v6m-6-2h12"></path></svg>
            </div>
          </div>
        </a>
      </div>
    }
    `
})
export class AdminHomeComponent implements OnInit {
  private partnerService = inject(PartnerService);
  private boatService = inject(BoatService);
  private employeeService = inject(EmployeeService);
  private zoneService = inject(ZoneService);
  private mooringService = inject(MooringService);

  stats = {
    partners: 0,
    boats: 0,
    employees: 0,
    zones: 0,
    moorings: 0
  };

  loading = true;

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    forkJoin({
      partners: this.partnerService.getAll(),
      boats: this.boatService.getAll(),
      employees: this.employeeService.getAll(),
      zones: this.zoneService.getAll(),
      moorings: this.mooringService.getAll()
    }).subscribe({
      next: (results) => {
        this.stats.partners = results.partners.length;
        this.stats.boats = Array.isArray(results.boats) ? results.boats.length : (results.boats as any).content?.length || 0;
        this.stats.employees = results.employees.length;
        this.stats.zones = results.zones.length;
        this.stats.moorings = results.moorings.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading stats', err);
        this.loading = false;
      }
    });
  }
}
