import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
