import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MsdtPoint } from '../models/msdt-point.model';

@Injectable({ providedIn: 'root' })
export class MsdtStopDataService {
  private http = inject(HttpClient);

  private stopsSignal = signal<MsdtPoint[]>([]);
  readonly stops = this.stopsSignal.asReadonly();

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<MsdtPoint[]>('data/stops.json').subscribe((data) => {
      this.stopsSignal.set(data);
    });
  }

  getStopById(id: string): Signal<MsdtPoint | null> {
    return computed(() => this.stops().find((s) => s.id === id) || null);
  }
}
