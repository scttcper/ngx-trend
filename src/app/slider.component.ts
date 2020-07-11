import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'slider',
  template: `
  <mat-slider
    class="example-margin"
    [max]="max"
    [min]="min"
    [thumbLabel]="true"
    [step]="step"
    [value]="value"
    (input)="handleInput($event)">
  </mat-slider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() min!: number;
  @Input() max!: number;
  @Input() step!: number;
  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number>();

  handleInput($event: MatSliderChange): void {
    this.valueChange.emit($event.value as number);
  }
}
