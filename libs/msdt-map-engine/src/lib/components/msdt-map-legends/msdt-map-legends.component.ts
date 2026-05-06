import { CommonModule } from '@angular/common';
import { Component, signal, computed, output, effect } from '@angular/core';
import { FilterSpecification } from 'maplibre-gl';

@Component({
  selector: 'msdt-map-legends',
  templateUrl: './msdt-map-legends.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MsdtMapLegendComponent {
  readonly categories = [
    {
      id: 'settlement',
      label: 'Поселения',
      icon: 'icons/home.webp',
      color: '#5D4037',
    },
    {
      id: 'mountain',
      label: 'Гео. объекты',
      icon: 'icons/mountain.webp',
      color: '#2D5A27',
    },
    {
      id: 'river',
      label: 'Водные объекты',
      icon: 'icons/wetland.webp',
      color: '#0077BE',
    },
    {
      id: 'forest',
      label: 'Лес',
      icon: 'icons/park-alt1.webp',
      color: '#6B705C',
    },
    {
      id: 'garden',
      label: 'Растения',
      icon: 'icons/garden.webp',
      color: '#6B705C',
    },
  ];

  filterChanged = output<FilterSpecification>();

  activeCategories = signal<string[]>(['settlement']);

  isOpen = signal(false);

  constructor() {
    effect(() => {
      this.filterChanged.emit(this.mapFilter());
    });
  }

  toggleCategory(id: string): void {
    this.activeCategories.update((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  }

  mapFilter = computed<FilterSpecification>(() => {
    const active = this.activeCategories();

    return active.length > 0
      ? ['match', ['get', 'category'], active, true, false]
      : ['==', ['get', 'category'], 'none'];
  });
}
