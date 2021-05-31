/* eslint-disable quotes, @typescript-eslint/quotes */
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'trend-code',
  template: `
  <div class="trendCode">
    <pre style="display: block; overflow-x: auto; padding: 0.5em; background: white; color: black;">
// app.module.ts
import {{ '{' }} NgModule } from '@angular/core';
import {{ '{' }} TrendModule } from 'ngx-trend';
// animations module required for autoDraw
import {{ '{' }} BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({{ '{' }}
  imports: [
    BrowserAnimationsModule,
    TrendModule,
  ],
})
export class AppModule {{ '{' }} }
    </pre>
    <pre style="display: block; overflow-x: auto; padding: 0.5em; background: white; color: black;">
      {{ codeString }}
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
  @Input() data!: number[];
  @Input() gradient!: string[];
  @Input() radius!: number;
  @Input() strokeWidth!: number;
  @Input() strokeLinecap!: string;
  codeString = '';

  ngOnChanges(): void {
    this.codeString = `
// your.component.ts
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
