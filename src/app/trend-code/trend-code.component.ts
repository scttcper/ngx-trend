/* tslint:disable:quotemark */
import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'trend-code',
  template: `
  <div class="trendCode">
    <pre style="display: block; overflow-x: auto; padding: 0.5em; background: white; color: black;">
      {{codeString}}
    </pre>
  </div>
  `,
  styles: [`
  .trendCode pre {
    padding: 1.5rem 2rem !important;
    margin: 0;
    background: #F8F8F8 !important;
  }
  `],
})
export class TrendCodeComponent implements OnChanges {
  @Input() data: number[];
  @Input() gradient: string[];
  @Input() radius: number;
  @Input() strokeWidth: number;
  @Input() strokeLinecap: string;
  codeString = '';
  constructor() { }

  ngOnChanges() {
    this.codeString = `
import { Component } from '@angular/core';

@Component({
  selector: 'your-component',
  template: \`
    <ngx-trend
      autoDraw="true"
      autoDrawDuration="3000"
      autoDrawEasing="ease-out"
      smooth="true"
      [data]="[${this.data}]"
      [gradient]="['${this.gradient.join("', '")}']"
      radius="${this.radius}"
      strokeWidth="${this.strokeWidth}"
      strokeLinecap="${this.strokeLinecap}"
    >
    </ngx-trend>
  \`,
})
export class YourComponent {}`;
  }

}
