import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MsdtMapService {
  historicalOpacity = signal<number>(0.8);

  updateOpacity(value: number): void {
    this.historicalOpacity.set(value);
  }
}
