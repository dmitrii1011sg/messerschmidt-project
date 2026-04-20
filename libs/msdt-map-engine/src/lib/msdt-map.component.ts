import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import {
  MapComponent as MglMap,
  RasterSourceComponent,
  LayerComponent,
  RasterDemSourceComponent,
} from '@maplibre/ngx-maplibre-gl';
import { MsdtMapService } from './services/msdt-map.service';
import { LngLatBounds, Map } from 'maplibre-gl';
import {
  MsdtMapMarkerComponent,
  MsdtPoint,
} from './components/msdt-map-marker/msdt-map-marker.component';

@Component({
  selector: 'msdt-map',
  standalone: true,
  imports: [
    MglMap,
    RasterSourceComponent,
    RasterDemSourceComponent,
    LayerComponent,
    MsdtMapMarkerComponent,
  ],
  template: `
    <mgl-map
      [mapStyle]="mapLibreSource"
      [zoom]="[4]"
      [center]="[129.7, 62.0]"
      [pitch]="[45]"
      [canvasContextAttributes]="{ preserveDrawingBuffer: true }"
      [maxBounds]="bounds"
      class="absolute inset-0 h-full w-full bg-slate-100"
      (mapLoad)="onMapLoad($event)"
    >
      <mgl-raster-source
        id="messerschmidt-source"
        type="raster"
        [tiles]="['https://mapwarper.net/mosaics/tile/2476/{z}/{x}/{y}.png']"
        [tileSize]="256"
      ></mgl-raster-source>

      <mgl-raster-dem-source
        id="terrain-source"
        [tiles]="[mapLibreTerrainSource]"
        [tileSize]="256"
      ></mgl-raster-dem-source>

      <mgl-layer
        id="messerschmidt-layer"
        type="raster"
        source="messerschmidt-source"
        [paint]="{
          'raster-opacity': opacity(),
          'raster-fade-duration': 300,
        }"
      ></mgl-layer>

      @for (stop of stops(); track stop.id) {
        <msdt-map-marker [stop]="stop"> </msdt-map-marker>
      }
    </mgl-map>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsdtMapComponent {
  private readonly mapService = inject(MsdtMapService);
  protected readonly opacity = this.mapService.historicalOpacity;
  protected readonly bounds = new LngLatBounds(
    [106.6285, 56.9571],
    [109.3616, 58.3127],
  );

  readonly mapLibreSource: string = `https://api.maptiler.com/maps/hybrid/style.json?key=${(import.meta as any).env.NG_APP_MAPTILER_KEY}`;
  readonly mapLibreTerrainSource: string = `https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=${(import.meta as any).env.NG_APP_MAPTILER_KEY}`;

  protected readonly stops = signal<MsdtPoint[]>([
    {
      id: 1,
      name: 'Красноярово',
      coordinates: [107.4565, 57.3375],
      description: 'Красноярово',
    },
    {
      id: 2,
      name: 'Макарово',
      coordinates: [107.8231, 57.4835],
      description: 'Макарово',
    },
  ]);

  onMapLoad(map: Map): void {
    map.setTerrain({
      source: 'terrain-source',
      exaggeration: 1.8,
    });
  }

  onMarkerClick(stop: MsdtPoint): void {
    console.warn(`Нажата остановка: ${stop.name}`);
    alert(`${stop.name}: ${stop.description}`);
  }

  // onMapClick(event: any): void {
  //   const coords = event.lngLat;
  //   // console.log(
  //   //   `[${coords.lng.toFixed(4)}, ${coords.lat.toFixed(4)}]`,
  //   // );
  // }
}
