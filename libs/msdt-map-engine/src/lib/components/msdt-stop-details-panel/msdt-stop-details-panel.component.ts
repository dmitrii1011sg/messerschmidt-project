import { Component, inject, computed, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsdtStopSelectionService } from '../../services/msdt-stop-selection.service';
import { MsdtStopDataService } from '../../services/msdt-stop-data.service';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MsdtMapService } from '../../services/msdt-map.service';
import PhotoSwipe from 'photoswipe';

@Component({
  selector: 'msdt-stop-details',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: 'msdt-stop-details-panel.component.html',
  styleUrls: ['msdt-stop-details-panel.component.scss'],
})
export class MsdtStopDetailsComponent {
  private readonly mapService = inject(MsdtMapService);
  protected readonly selectionService = inject(MsdtStopSelectionService);
  private readonly dataService = inject(MsdtStopDataService);

  stop = computed(() => {
    const id = this.selectionService.selectedStopId();

    return id ? this.dataService.getStopById(id)() : null;
  });

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return !!this.selectionService.selectedStopId();
  }

  onDragEnd(event: CdkDragEnd): void {
    const offset = event.distance.y;

    if (offset > 200) {
      this.selectionService.unselect();
    }
    event.source._dragRef.reset();
  }

  onFlyTo(coordinates: [number, number]): void {
    this.mapService.flyTo(coordinates, 15);
  }

  openPhotoSwipe(index: number): void {
    const data = this.stop();
    if (!data) return;
    if (!data.images) return;

    const dataSource = data.images.map((img) => ({
      src: 'images/' + img.url,
      msrc: 'images/' + img.url,
      w: 0,
      h: 0,
      alt: img.caption || data.name,
    }));

    const pswp = new PhotoSwipe({
      dataSource: dataSource,
      index: index,
      bgOpacity: 0.95,
      clickToCloseNonZoomable: false,
      allowPanToNext: true,
      wheelToZoom: true,
    });

    pswp.on('gettingData', (e) => {
      if (e.data.w! > 0) return;

      const img = new Image();
      img.src = e.data.src!;
      img.onload = () => {
        e.data.w = img.width;
        e.data.h = img.height;
        pswp.refreshSlideContent(e.index);
      };
    });

    pswp.init();
  }
}
