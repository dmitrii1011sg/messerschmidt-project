import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'msdt-opacity-slider',
  templateUrl: './msdt-opacity-slider.component.html',
  styleUrl: './msdt-opacity-slider.component.scss',
})
export class MsdtOpacitySlider {
  label = input<string>('');
  min = input<number>(0);
  max = input<number>(1);
  step = input<number>(0.01);

  value = model<number>(0.5);

  handleInput(event: Event): void {
    const node = event.target as HTMLInputElement;
    this.value.set(parseFloat(node.value));
  }
}
