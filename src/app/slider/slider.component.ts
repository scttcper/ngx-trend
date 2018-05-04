import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

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
    (input)="valueChange.emit($event.value)">
  </mat-slider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();
}
