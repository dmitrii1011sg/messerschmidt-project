import { Component, input, output } from '@angular/core';
import { MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { MsdtPoint } from '../../models/msdt-point.model';

@Component({
  selector: 'msdt-map-marker',
  standalone: true,
  imports: [MarkerComponent],
  templateUrl: './msdt-map-marker.component.html',
})
export class MsdtMapMarkerComponent {
  stop = input.required<MsdtPoint>();
  selectMarker = output<MsdtPoint>();
}
