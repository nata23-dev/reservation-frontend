import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  readonly message = input.required<string>();
  readonly type = input<'error' | 'success' | 'info'>('error');

  readonly dismiss = output<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }
}
