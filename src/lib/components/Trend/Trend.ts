import { Component, Input, OnInit, OnChanges, ViewChild, Renderer2, ElementRef } from '@angular/core';

import {
  buildSmoothPath,
  buildLinearPath,
  injectStyleTag,
} from '../../helpers/DOM.helpers';
import { normalize } from '../../helpers/math.helpers';
import { generateId } from '../../helpers/misc.helpers';
import { normalizeDataset, generateAutoDrawCss } from './Trend.helpers';

@Component({
  selector: 'Trend',
  template: `
  <svg
    #svg
    [style.width.%]="svgWidth"
    [style.height.%]="svgHeight"
    [attr.radius]="radius"
    [attr.stroke]="stroke"
    [attr.stroke-width]="strokeWidth"
  >
  <path
    fill="none"
    [attr.d]="path"
    [attr.stroke]="gradient"
  />
  </svg>
  `,
})
export class TrendComponent implements OnInit, OnChanges {
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
  @Input() strokeWidth = 1;
  @Input() gradient: string[];
  @ViewChild('svg') svg: ElementRef;
  path: any;
  viewBoxWidth = 300;
  viewBoxHeight = 75;
  svgWidth = 100;
  svgHeight = 25;
  constructor(private renderer: Renderer2) {}
  ngOnInit() {
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
    this.svgWidth = this.width || 100;
    this.svgHeight = this.height || 25;

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
  }
  ngOnChanges() {
    // TODO
  }

}
