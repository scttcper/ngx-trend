import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'slider',
  styleUrls: ['./slider.component.css'],
  template: `
  <nouislider
    [connect]="[true, true]"
    [min]="min"
    [max]="max"
    [step]="step"
    [ngModel]="value"
    (update)="onChange($event)"
  >
  </nouislider>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();

  onChange(value) {
    this.valueChange.emit(value);
  }

}
