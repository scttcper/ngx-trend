import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'gradient-preview',
  styles: [
    `
  .gradientPreview {
    font-family: Times;
    position: relative;
    display: inline-block;
    margin: 3px 6px 3px 0;
    width: 30px;
    height: 30px;
    border-radius: 2px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.2);
    border: 2px solid #FFF;
    cursor: pointer;
    outline: none;
  }

  .gradientPreview.isActive {
    border: 2px solid #111;
    box-shadow: none;
  }
  `,
  ],
  template: `
  <button
    (click)="handleUpdate.next(['gradient', gradient])"
    class="gradientPreview"
    [class.isActive]="isActive"
    [style.background]="background"
  ></button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientPreviewComponent implements OnInit {
  @Input() gradient: string[];
  @Input() isActive: boolean;
  @Input() handleUpdate: EventEmitter<any>;
  background = '';

  ngOnInit() {
    // For simplicity, we're always passing a gradient, even when it's just 1
    // color. We'll handle that discrepancy here.
    this.background =
      this.gradient.length === 1
        ? this.gradient[0]
        : `linear-gradient(0deg, ${this.gradient.join(', ')})`;
  }
}
