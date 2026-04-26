import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  MapComponent as MglMap,
  RasterSourceComponent,
  LayerComponent,
  RasterDemSourceComponent,
} from '@maplibre/ngx-maplibre-gl';
import { MsdtMapService } from './services/msdt-map.service';
import { LngLatBounds, Map } from 'maplibre-gl';
import { MsdtStopSelectionService } from './services/msdt-stop-selection.service';
import { MsdtStopDataService } from './services/msdt-stop-data.service';
import { MsdtMapLayersComponent } from './components/msdt-map-layers/msdt-map-layers.component';

@Component({
  selector: 'msdt-map',
  standalone: true,
  imports: [
    MglMap,
    RasterSourceComponent,
    RasterDemSourceComponent,
    LayerComponent,
    MsdtMapLayersComponent,
  ],
  templateUrl: 'msdt-map.component.html',
  styleUrls: ['msdt-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsdtMapComponent {
  private readonly mapService = inject(MsdtMapService);
  protected readonly stopService = inject(MsdtStopDataService);
  protected readonly selectionService = inject(MsdtStopSelectionService);
  protected readonly opacity = this.mapService.historicalOpacity;
  protected readonly bounds = new LngLatBounds(
    [106.6285, 56.9571],
    [109.3616, 58.3127],
  );

  readonly mapLibreSource: string = `https://api.maptiler.com/maps/hybrid/style.json?key=${(import.meta as any).env.NG_APP_MAPTILER_KEY}`;
  readonly mapLibreTerrainSource: string = `https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=${(import.meta as any).env.NG_APP_MAPTILER_KEY}`;

  protected readonly stops = this.stopService.stops;
  protected readonly route = this.stopService.routePath;

  onMapLoad(map: Map): void {
    this.mapService.setMapInstance(map);
    map.setTerrain({
      source: 'terrain-source',
      exaggeration: 1,
    });
  }

  onMapClick(event: any): void {
    // const coords = event.lngLat;
    // console.log(`[${coords.lng.toFixed(4)}, ${coords.lat.toFixed(4)}]`);
  }
}
