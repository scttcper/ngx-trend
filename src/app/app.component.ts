import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import json from '../lib/package.json';

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
];

const linecaps = ['butt', 'round', 'square'];

const defaultGradient = gradients[4];
const defaultLinecap = linecaps[0];
const placeholderData = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];

@Component({
  selector: 'app-root',
  template: `
  <div class="app">
    <demo-header></demo-header>
    <github-link class="cornerGithubLink"></github-link>
    <ngx-trend
      autoDraw="true"
      autoDrawDuration="3000"
      autoDrawEasing="ease-out"
      smooth="true"
      [data]="placeholderData"
      [gradient]="gradient"
      [radius]="radius"
      [strokeWidth]="strokeWidth"
      [strokeLinecap]="strokeLinecap"
    >
    </ngx-trend>

    <div class="tabGroup">
      <button
        class="tab"
        (click)="changeView('config')"
        [class.isActive]="view === 'config'"
      >
        Configure
      </button>
      <button
        class="tab"
        (click)="changeView('code')"
        [class.isActive]="view === 'code'"
      >
        Code
      </button>
    </div>
    <config
      *ngIf="view === 'config'"
      [gradients]="gradients"
      [gradient]="gradient"
      [linecaps]="linecaps"
      [(strokeWidth)]="strokeWidth"
      [(radius)]="radius"
      [strokeLinecap]="strokeLinecap"
      [handleUpdate]="updateTrendParam"
    >
    </config>
    <trend-code
      *ngIf="view === 'code'"
      [data]="placeholderData"
      [gradient]="gradient"
      [radius]="radius"
      [strokeWidth]="strokeWidth"
      [strokeLinecap]="strokeLinecap"
    >
    </trend-code>
    <demo-footer></demo-footer>
  </div>
  `,
})
export class AppComponent implements OnInit {
  gradients = gradients;
  linecaps = linecaps;
  placeholderData = placeholderData;
  view = 'config';
  radius = 10;
  strokeWidth = 2;
  gradient = defaultGradient;
  strokeLinecap = defaultLinecap;
  updateTrendParam = new EventEmitter<[string, any]>();
  constructor(title: Title) {
    const current = title.getTitle();
    // fix for tests
    if (json) {
      title.setTitle(`${current} ${json.version}`);
    }
  }


  changeView(view: string) {
    this.view = view;
  }
  ngOnInit() {
    this.updateTrendParam.subscribe(([key, value]) => this[key] = value);
  }
}
