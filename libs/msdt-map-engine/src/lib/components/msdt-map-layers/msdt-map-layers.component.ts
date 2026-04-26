import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  GeoJSONSourceComponent,
  LayerComponent,
} from '@maplibre/ngx-maplibre-gl';
import bezierSpline from '@turf/bezier-spline';
import { featureCollection, point, lineString } from '@turf/helpers';
import { MapLayerMouseEvent } from 'maplibre-gl';
import { MsdtStopSelectionService } from '../../services/msdt-stop-selection.service';
import { MsdtPoint } from '../../models/msdt-point.model';

@Component({
  selector: 'msdt-map-layers',
  standalone: true,
  imports: [GeoJSONSourceComponent, LayerComponent],
  templateUrl: './msdt-map-layers.component.html',
  styleUrls: ['./msdt-map-layers.component.scss'],
})
export class MsdtMapLayersComponent implements OnChanges {
  private readonly selectionService = inject(MsdtStopSelectionService);

  routeGeoJson: any = featureCollection([]);
  pointsGeoJson: any = featureCollection([]);

  @Input({ required: true })
  set stops(value: MsdtPoint[] | null) {
    this.updateLayers(value || []);
  }

  @Input() routeCoords: [number, number][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && 'routeCoords' in changes) {
      this.updateRoute();
    }
  }

  private updateLayers(stops: MsdtPoint[]): void {
    const validStops = (stops || []).filter(
      (s) =>
        s &&
        s.coordinates &&
        Array.isArray(s.coordinates) &&
        s.coordinates.length >= 2,
    );

    if (validStops.length > 0) {
      this.pointsGeoJson = featureCollection(
        validStops.map((s) => point(s.coordinates, { id: s.id, name: s.name })),
      );
    } else {
      this.pointsGeoJson = featureCollection([]);
    }
  }

  private updateRoute(): void {
    if (this.routeCoords.length >= 2) {
      const coords = this.routeCoords;
      const line = lineString(coords);

      this.routeGeoJson = bezierSpline(line, {
        resolution: 20000,
        sharpness: 0.35,
      });
    } else {
      this.routeGeoJson = featureCollection([]);
    }
  }

  onClusterClick(event: MapLayerMouseEvent): void {
    const map = event.target;
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    });
    if (!features.length) return;

    const clusterId = features[0].properties['cluster_id'];
    const source: any = map.getSource('points-source');

    source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
      if (err) return;
      map.easeTo({
        center: (features[0].geometry as any).coordinates,
        zoom: zoom,
      });
    });
  }

  onPointClick(event: MapLayerMouseEvent): void {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ['unclustered-point'],
    });
    if (features.length) {
      const stopId = features[0].properties['id'];
      this.selectionService.select(stopId);
    }
  }

  cursorToPointer(event: MapLayerMouseEvent): void {
    event.target.getCanvas().style.cursor = 'pointer';
  }

  cursorToDefault(event: MapLayerMouseEvent): void {
    event.target.getCanvas().style.cursor = '';
  }
}
