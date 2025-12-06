import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;

      this.authService.login(username, password).subscribe({
        next: (res: any) => {
          console.log('Login correcto:', res);

          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuario', JSON.stringify(res));
          }

          if (res.role === 'ADMIN') this.router.navigate(['/admin']);
          else if (res.role === 'EMPLOYEE') this.router.navigate(['/employee']);
          else if (res.role === 'PARTNER') this.router.navigate(['/partner']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      });
    }
  }
}
