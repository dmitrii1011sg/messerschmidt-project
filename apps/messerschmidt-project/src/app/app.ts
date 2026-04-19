import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsdtMapComponent, MsdtMapService } from '@msdt/map-engine';

@Component({
  imports: [RouterModule, MsdtMapComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'messerschmidt-project';

  private readonly mapService = inject(MsdtMapService);

  protected opacity = this.mapService.historicalOpacity;

  onOpacityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.mapService.updateOpacity(parseFloat(input.value));
  }
}
