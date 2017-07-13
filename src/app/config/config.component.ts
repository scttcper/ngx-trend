import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
const a = `<div class="column">
  <div class="configField">
    <h6 class="label">Width</h6>
    <Slider
      withBars
      value={params.strokeWidth}
      min={0.1}
      max={5}
      step={0.1}
      onChange={val => handleUpdate({ strokeWidth: val })}
    />
  </div>
  <div class="configField">
    <h6 class="label">Radius</h6>
    <Slider
      withBars
      value={params.radius}
      min={0}
      max={25}
      step={0.1}
      onChange={val => handleUpdate({ radius: val })}
    />
  </div>

</div>`;
@Component({
  selector: 'config',
  styleUrls: ['./config.component.css'],
  template: `
  <div class="row config">
    <div class="column">
      <div class="configField">
        <h6 class="label">Color</h6>
        <gradient-preview
          *ngFor="let g of gradients; let idx = index;"
          [gradient]="g"
          [handleUpdate]="handleUpdate"
          [isActive]="gradient === g"
        >
        </gradient-preview>
      </div>
      <div class="configField">
        <h6 class="label">Linecap</h6>
          <button
            class="toggle"
            *ngFor="let linecap of linecaps"
            [class.isActive]="strokeLinecap === linecap"
            (click)="handleUpdate.next(['strokeLinecap', linecap])"
          >
            {{linecap}}
          </button>
      </div>
    </div>
    <div class="column">
      <div class="configField">
        <h6 class="label">Width</h6>
        <slider
          [value]="strokeWidth"
          [min]="0.1"
          [max]="5"
          [step]="0.1"
          (valueChange)="strokeWidthChange.next($event)">
        </slider>
      </div>
      <div class="configField">
        <h6 class="label">Radius</h6>
        <slider
          [value]="radius"
          [min]="0.1"
          [max]="25"
          [step]="0.1"
          (valueChange)="radiusChange.next($event)">
        </slider>
      </div>
    </div>

  </div>
  `,
})
export class ConfigComponent implements OnInit {
  @Input() gradients: string[][];
  @Input() gradient: string[];
  @Input() linecaps: string[];
  @Input() strokeWidth: number;
  @Output() strokeWidthChange = new EventEmitter<number>();
  @Input() radius: number;
  @Output() radiusChange = new EventEmitter<number>();
  @Input() strokeLinecap: string;
  @Input() handleUpdate: EventEmitter<string>;
  constructor() { }

  ngOnInit() {
  }

}
