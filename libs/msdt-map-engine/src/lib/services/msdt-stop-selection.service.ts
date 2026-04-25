import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MsdtStopSelectionService {
  readonly selectedStopId = signal<string | null>(null);

  select(id: string): void {
    this.selectedStopId.set(id);
  }

  unselect(): void {
    this.selectedStopId.set(null);
  }
}
