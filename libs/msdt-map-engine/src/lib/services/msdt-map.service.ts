import { Injectable, signal } from '@angular/core';
import { LngLatLike, Map } from 'maplibre-gl';

@Injectable({ providedIn: 'root' })
export class MsdtMapService {
  private mapInstance?: Map;

  historicalOpacity = signal<number>(0.0);

  setMapInstance(map: Map): void {
    this.mapInstance = map;
  }

  flyTo(coordinates: LngLatLike, zoom = 12): void {
    if (this.mapInstance) {
      this.mapInstance.flyTo({
        zoom,
        center: coordinates,
        speed: 1.2,
        curve: 1.42,
        essential: true,
      });
    }
  }

  updateOpacity(value: number): void {
    this.historicalOpacity.set(value);
  }
}
