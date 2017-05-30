import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  DoCheck,
  ViewChild,
  Renderer2,
  ElementRef,
  IterableDiffers,
} from '@angular/core';

import {
  buildSmoothPath,
  buildLinearPath,
  injectStyleTag,
} from '../helpers/DOM.helpers';
import { normalize } from '../helpers/math.helpers';
import { generateId } from '../helpers/misc.helpers';
import { normalizeDataset, generateAutoDrawCss } from './trend.helpers';

@Component({
  selector: 'ngx-trend',
  template: `
  <svg
    #svg
    [attr.width]="svgWidth"
    [attr.height]="svgHeight"
    [attr.stroke]="stroke"
    [attr.stroke-width]="strokeWidth"
    [attr.stroke-linecap]="strokeLinecap"
  >
  <defs *ngIf="gradient">
    <linearGradient
      [attr.id]="gradientId"
      x1="0%"
      y1="0%"
      x2="0%"
      y2="100%"
    >
    <stop
      *ngFor="let c of gradient.slice().reverse(); let idx = index;"
      [attr.key]="idx"
      [attr.offset]="normalize(idx)"
      [attr.stop-color]="c"
    />
    </linearGradient>
  </defs>
  <path
    #pathEl
    [attr.id]="'ngx-trend-' + trendId"
    fill="none"
    [attr.d]="path"
    [attr.stroke]="generateStroke(gradient)"
  />
  </svg>
  `,
})
export class TrendComponent implements OnChanges, AfterViewInit, DoCheck {
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
  @Input() gradient: string[];
  @ViewChild('svg') svg: ElementRef;
  @ViewChild('pathEl') pathEl: ElementRef;
  trendId: number;
  gradientId = '';
  path: any;
  viewBoxWidth = 300;
  viewBoxHeight = 75;
  svgWidth: string | number = '100%';
  svgHeight: string | number = '25%';
  lineLength: number;
  iterableDiffer: any;
  firstDraw = false;

  constructor(
    private renderer: Renderer2,
    private _iterableDiffers: IterableDiffers,
  ) {
    // Generate a random ID. This is important for distinguishing between
    // Trend components on a page, so that they can have different keyframe
    // animations.
    this.trendId = generateId();
    this.gradientId = `ngx-trend-vertical-gradient-${this.trendId}`;
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }
  normalize(index: number) {
    return normalize({
      value: index,
      min: 0,
      max: this.gradient.length - 1 || 1,
    });
  }
  generateStroke(gradient: string[]) {
    return gradient ? `url(#${this.gradientId})` : undefined;
  }
  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.data);
    if (changes && this.firstDraw) {
      this.setup();
    }
}
  ngOnChanges(changes) {
    this.setup();
  }
  ngAfterViewInit() {

    if (this.autoDraw) {
      this.lineLength = this.pathEl.nativeElement.getTotalLength();

      const css = generateAutoDrawCss({
        id: this.trendId,
        lineLength: this.lineLength,
        duration: this.autoDrawDuration,
        easing: this.autoDrawEasing,
      });
      injectStyleTag(css);
    }
  }
  setup(): void {
    // We need at least 2 points to draw a graph.
    if (!this.data || this.data.length < 2) {
      return null;
    }

    // `data` can either be an array of numbers:
    // [1, 2, 3]
    // or, an array of objects containing a value:
    // [ { value: 1 }, { value: 2 }, { value: 3 }]
    //
    // For now, we're just going to convert the second form to the first.
    // Later on, if/when we support tooltips, we may adjust.
    const plainValues: number[] = this.data.map((point) => {
      if (typeof point === 'number') {
        return point;
      }
      return point.value;
    });

    // Our viewbox needs to be in absolute units, so we'll default to 300x75
    // Our SVG can be a %, though; this is what makes it scalable.
    // By defaulting to percentages, the SVG will grow to fill its parent
    // container, preserving a 1/4 aspect ratio.
    this.viewBoxWidth = this.width || 300;
    this.viewBoxHeight = this.height || 75;
    this.svgWidth = this.width || '100%';
    this.svgHeight = this.height || '25%';

    const normalizedValues = normalizeDataset(plainValues, {
      minX: this.padding,
      maxX: this.viewBoxWidth - this.padding,
      // NOTE: Because SVGs are indexed from the top left, but most data is
      // indexed from the bottom left, we're inverting the Y min/max.
      minY: this.viewBoxHeight - this.padding,
      maxY: this.padding,
    });

    this.path = this.smooth
      ? buildSmoothPath(normalizedValues, { radius: this.radius })
      : buildLinearPath(normalizedValues);

    this.renderer.setAttribute(
      this.svg.nativeElement,
      'viewBox',
      `0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`
    );
    // allow for watching changes to data array after first draw
    this.firstDraw = true;
  }
}
