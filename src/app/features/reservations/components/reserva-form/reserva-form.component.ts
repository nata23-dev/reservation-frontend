import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ReservaService } from '../../../../core/services/reserva.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

const SERVICES = [
  'Haircut',
  'Hair coloring',
  'Manicure',
  'Pedicure',
  'Massage',
  'Facial',
  'Waxing',
  'Beard trim',
  'Nail art',
  'Consultation',
] as const;

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ToastComponent, RouterLink],
})
export class ReservaFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly reservaService = inject(ReservaService);
  private readonly router = inject(Router);

  readonly services = SERVICES;
  readonly errorMessage = signal<string | null>(null);
  readonly submitting = signal(false);

  readonly form = this.fb.group({
    nombreCliente: ['', [Validators.required, Validators.minLength(2)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    servicio: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.submitting.set(true);

    const value = this.form.getRawValue();
    const reserva = {
      customerName: value.nombreCliente!,
      date: value.fecha!,
      time: value.hora!,
      service: value.servicio!,
    };

    this.reservaService.create(reserva).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/reservations']);
      },
      error: (err) => {
        this.submitting.set(false);
        const message = this.getErrorMessage(err);
        this.errorMessage.set(message);
      },
    });
  }

  private getErrorMessage(err: unknown): string {
    if (err && typeof err === 'object' && 'error' in err) {
      const error = (err as { error?: { message?: string }; message?: string })
        .error;
      if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
      }
    }
    const msg =
      err && typeof err === 'object' && 'message' in err
        ? String((err as { message: string }).message)
        : '';
    if (msg === 'Failed to fetch' || msg.includes('fetch')) {
      return 'Cannot connect to the server. Check that the backend is running and CORS is configured.';
    }
    return msg || 'Error saving reservation.';
  }
}
