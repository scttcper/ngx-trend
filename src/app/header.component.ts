import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-header',
  styles: [`
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .header h1 {
    font-size: 46px;
    margin-bottom: 2rem;
  }
  `],
  template: `
  <header class="header">
    <h1>Angular Trend</h1>
    <p>Simple, elegant trend graphs for Angular.</p>
    <p>
      An Angular port of
      <a href="https://github.com/unsplash/react-trend">react-trend</a> by
      <a href="https://unsplash.com">Unsplash</a>.
    </p>
  </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
