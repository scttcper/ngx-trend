import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'demo-footer',
  template: `
  <footer class="footer">
    Demo using Anuglar {{ version }}
    <br>
    Released under the
    <a href="https://github.com/scttcper/ngx-trend/blob/master/LICENSE">MIT</a> license.
    <a href="https://github.com/scttcper/ngx-trend">View source</a>.
  </footer>
  `,
  styles: [`
  .footer {
    margin-top: 5rem;
    line-height: 2;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  @media only screen and (max-width: 480px) {
    .footer {
      font-size: 10px;
    }
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  version = VERSION.full;
}
