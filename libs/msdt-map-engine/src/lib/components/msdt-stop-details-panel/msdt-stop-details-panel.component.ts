import { Component, inject, computed, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsdtStopSelectionService } from '../../services/msdt-stop-selection.service';
import { MsdtStopDataService } from '../../services/msdt-stop-data.service';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MsdtMapService } from '../../services/msdt-map.service';

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
}
