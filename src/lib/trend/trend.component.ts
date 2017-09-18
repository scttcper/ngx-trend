import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

import { buildSmoothPath, buildLinearPath } from '../helpers/DOM.helpers';
import { normalize } from '../helpers/math.helpers';
import { generateId } from '../helpers/misc.helpers';
import { normalizeDataset } from './trend.helpers';


@Component({
  selector: 'ngx-trend',
  template: `
  <svg *ngIf="data && data.length >= 2"
    [attr.width]="svgWidth"
    [attr.height]="svgHeight"
    [attr.stroke]="stroke"
    [attr.stroke-width]="strokeWidth"
    [attr.stroke-linecap]="strokeLinecap"
    [attr.viewBox]="viewBox"
  >
    <defs *ngIf="gradient && gradient.length">
      <linearGradient [attr.id]="gradientId"
        x1="0%" y1="0%" x2="0%" y2="100%"
      >
        <stop
          *ngFor="let g of gradientTrimmed;"
          [attr.key]="g.idx"
          [attr.offset]="g.offset"
          [attr.stop-color]="g.stopColor"
        />
      </linearGradient>
    </defs>
    <path fill="none" #pathEl
      [attr.stroke]="pathStroke" [attr.d]="d"
      [@pathAnimaiton]="{
        value: animationState,
        params: {
          autoDrawDuration: autoDrawDuration,
          autoDrawEasing: autoDrawEasing,
          lineLength: lineLength
        }
      }" />
  </svg>
  `,
  animations: [
    trigger('pathAnimaiton', [
      transition('* => active', [
        // We do the animation using the dash array/offset trick
        // https://css-tricks.com/svg-line-animation-works/
        animate('{{ autoDrawDuration }}ms {{ autoDrawEasing }}',
          keyframes([
            style({
              'stroke-dasharray': '{{ lineLength }}',
              'stroke-dashoffset': '{{ lineLength }}',
            }),
            style({
              'stroke-dasharray': '{{ lineLength }}',
              'stroke-dashoffset': 0,
            }),
          ]),
        ),
        // One unfortunate side-effect of the auto-draw is that the line is
        // actually 1 big dash, the same length as the line itself. If the
        // line length changes (eg. radius change, new data), that dash won't
        // be the same length anymore. We can fix that by removing those
        // properties once the auto-draw is completed.
        style({
          'stroke-dashoffset': '',
          'stroke-dasharray': '',
        }),
      ]),
    ]),
  ],
})
export class TrendComponent implements OnChanges {
  id: number;
  @Input() data: (number | {value: number})[];
  @Input() smooth: boolean;
  @Input() autoDraw = false;
  @Input() autoDrawDuration = 2000;
  @Input() autoDrawEasing = 'ease';
  @Input() width: number;
  @Input() height: number;
  @Input() padding = 8;
  @Input() radius = 10;
  @Input() stroke = 'black';
  @Input() strokeLinecap = '';
  @Input() strokeWidth = 1;
  @Input() gradient: string[] = [];
  @ViewChild('pathEl') pathEl: ElementRef;
  gradientTrimmed: any[];
  d: any;
  svgWidth: string | number = '100%';
  svgHeight: string | number = '25%';
  viewBox: string;
  pathStroke: any;
  gradientId: string;
  lineLength: number;
  animationState = 'inactive';

  constructor() {
    this.id = generateId();
    this.gradientId = `ngx-trend-vertical-gradient-${this.id}`;
  }
  ngOnChanges() {
    // We need at least 2 points to draw a graph.
    if (!this.data || this.data.length < 2) {
      return;
    }

    // `data` can either be an array of numbers:
    // [1, 2, 3]
    // or, an array of objects containing a value:
    // [ { value: 1 }, { value: 2 }, { value: 3 }]
    //
    // For now, we're just going to convert the second form to the first.
    // Later on, if/when we support tooltips, we may adjust.
    const plainValues = this.data.map((point) => {
      if (typeof point === 'number') {
        return point;
      }
      return point.value;
    });

    // Our viewbox needs to be in absolute units, so we'll default to 300x75
    // Our SVG can be a %, though; this is what makes it scalable.
    // By defaulting to percentages, the SVG will grow to fill its parent
    // container, preserving a 1/4 aspect ratio.
    const viewBoxWidth = this.width || 300;
    const viewBoxHeight = this.height || 75;
    this.svgWidth = this.width || '100%';
    this.svgHeight = this.height || '25%';
    this.viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
    this.pathStroke = (this.gradient && this.gradient.length) ? `url('${location.href}#${this.gradientId}` : undefined;

    this.gradientTrimmed = this.gradient.slice().reverse().map((val, idx) => {
      return {
        idx,
        stopColor: val,
        offset: normalize(idx, 0, this.gradient.length - 1 || 1),
      };
    });

    const normalizedValues = normalizeDataset(plainValues,
      this.padding,
      viewBoxWidth - this.padding,
      // NOTE: Because SVGs are indexed from the top left, but most data is
      // indexed from the bottom left, we're inverting the Y min/max.
      viewBoxHeight - this.padding,
      this.padding,
    );

    if (this.autoDraw) {
      setTimeout(() => {
        this.lineLength = this.pathEl.nativeElement.getTotalLength();
        this.animationState = 'active';
      });
    }

    this.d = this.smooth
      ? buildSmoothPath(normalizedValues, this.radius)
      : buildLinearPath(normalizedValues);
  }
}
