import { Component, inject, signal } from '@angular/core';
import {
  MsdtMapComponent,
  MsdtMapService,
  MsdtStopDetailsComponent,
} from '@msdt/map-engine';
import { MsdtOpacitySlider } from '@msdt/ui-kit';

@Component({
  imports: [MsdtMapComponent, MsdtStopDetailsComponent, MsdtOpacitySlider],
  selector: 'app-workspace',
  templateUrl: './app-workspace.component.html',
  styleUrl: './app-workspace.component.scss',
})
export class AppWorkspace {
  private readonly mapService = inject(MsdtMapService);
  protected opacity = this.mapService.historicalOpacity;

  showSources = signal(false);

  toggleSources(): void {
    this.showSources.set(!this.showSources());
  }
}
