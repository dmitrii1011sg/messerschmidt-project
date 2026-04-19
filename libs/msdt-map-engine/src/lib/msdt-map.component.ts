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
} from '@maplibre/ngx-maplibre-gl';
import { MsdtMapService } from './services/msdt-map.service';
import { LngLatBounds } from 'maplibre-gl';
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
    LayerComponent,
    MsdtMapMarkerComponent,
  ],
  template: `
    <mgl-map
      [mapStyle]="mapLibreExampleSource"
      [zoom]="[4]"
      [center]="[129.7, 62.0]"
      [pitch]="[45]"
      [canvasContextAttributes]="{ preserveDrawingBuffer: true }"
      [maxBounds]="bounds"
      class="absolute inset-0 h-full w-full bg-slate-100"
    >
      <mgl-raster-source
        id="messerschmidt-source"
        type="raster"
        [tiles]="['https://mapwarper.net/mosaics/tile/2476/{z}/{x}/{y}.png']"
        [tileSize]="256"
      ></mgl-raster-source>

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

  readonly mapLibreExampleSource: string =
    'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL';

  protected readonly stops = signal<MsdtPoint[]>([
    {
      id: 1,
      name: 'Красноярово',
      coordinates: [107.4565, 57.3375],
      description: 'Здесь Мессершмидт изучал...',
    },
    {
      id: 2,
      name: 'Макарово',
      coordinates: [107.8231, 57.4835],
      description: 'Наблюдения за скалами...',
    },
  ]);

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
