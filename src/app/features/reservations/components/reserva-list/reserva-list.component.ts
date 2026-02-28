import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { ReservaService } from '../../../../core/services/reserva.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class ReservaListComponent {
  private readonly reservaService = inject(ReservaService);
  private readonly refreshTrigger = new Subject<void>();

  readonly reservas$ = this.refreshTrigger.pipe(
    startWith(undefined),
    switchMap(() => this.reservaService.getAll()),
  );

  cancelReserva(id: number): void {
    this.reservaService.cancel(id).subscribe({
      next: () => this.refreshTrigger.next(),
      error: () => this.refreshTrigger.next(),
    });
  }
}
