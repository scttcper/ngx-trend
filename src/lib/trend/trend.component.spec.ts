import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TrendComponent } from './trend.component';

describe('TrendComponent', () => {
  let component: TrendComponent;
  let fixture: ComponentFixture<TrendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ TrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('returns null when no data is provided', () => {
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('returns null when only a single point is provided', () => {
    component.data = [3];
    component.ngOnChanges();
    fixture.detectChanges();
    expect(fixture.nativeElement.children.length).toEqual(0);
  });

  it('defaults to percentage dimensions and absolute viewbox coords', () => {
    component.data = [3, 2, 1];
    component.ngOnChanges();
    fixture.detectChanges();
    const { svgWidth, svgHeight, viewBox } = component;
    spyOn(component, 'ngOnChanges').and.returnValue();

    expect(svgWidth).toEqual('100%');
    expect(svgHeight).toEqual('25%');
    expect(viewBox).toEqual('0 0 300 75');
  });

  it('delegates props to the parent SVG', () => {
    component.data = [1, 5, 1];
    component.strokeWidth = 3;
    component.ngOnChanges();
    fixture.detectChanges();
    const { strokeWidth } = component;

    expect(strokeWidth).toEqual(3);
  });

  it('renders a path matching the provided data', () => {
    component.data = [1, 5, 1];
    component.ngOnChanges();
    fixture.detectChanges();
    const path = fixture.nativeElement.getElementsByTagName('path')[0];

    expect(path.getAttribute('d')).toEqual('M 8,67\nL 150,8\nL 292,67\n');
    expect(path.getAttribute('fill')).toEqual('none');
  });

  it('renders a smooth path when requested', () => {
    component.data = [1, 5, 1];
    component.smooth = true;
    component.ngOnChanges();
    fixture.detectChanges();
    const path = fixture.nativeElement.getElementsByTagName('path')[0];

    // Smooth lines are complex, and subject to refactoring.
    // Just check that it's non-linear and has an `S` command in there.
    expect(path.getAttribute('d')).not.toEqual('M 8,67\nL 150,8\nL 292,67\n');
    expect(path.getAttribute('d')).toContain('S');
  });

  it('handles autoDraw', () => {
    component.data = [1, 5, 1];
    component.autoDraw = true;
    component.ngOnChanges();
    fixture.detectChanges();
    // I don't really know the best way to test this, beyond checking that
    // it doesn't blow up.

    expect(component).toBeTruthy();
  });

  it('renders a gradient when multiple colours are provided', () => {
    // I don't really know the best way to test this, beyond checking that
    // it doesn't blow up.
    component.data = [1, 5, 1];
    component.gradient = ['red', 'blue'];
    component.ngOnChanges();
    fixture.detectChanges();

    const stops = fixture.nativeElement.getElementsByTagName('stop');

    const firstStop = stops[0];
    const lastStop = stops[stops.length - 1];

    expect(stops.length).toEqual(2);

    expect(firstStop.getAttribute('offset')).toEqual('0');
    expect(firstStop.getAttribute('stop-color')).toEqual('blue');
    expect(lastStop.getAttribute('offset')).toEqual('1');
    expect(lastStop.getAttribute('stop-color')).toEqual('red');
  });

  it('handles an array of value objects', () => {
    // We'll check that it renders identical output for both types.
    const data = {
      numbers: [1, 5, 1],
      objects: [{ value: 1 }, { value: 5 }, { value: 1 }],
    };

    component.data = data.numbers;
    component.ngOnChanges();
    fixture.detectChanges();

    const numberPath = fixture.nativeElement.getElementsByTagName('path')[0].getAttribute('d');

    component.data = data.objects;
    component.ngOnChanges();
    fixture.detectChanges();

    const objectPath = fixture.nativeElement.getElementsByTagName('path')[0].getAttribute('d');

    // Compare the actual path rendered, not the entire HTML output.
    // This is because trends are given randomly-generated IDs, and
    // an ID prop is applied to the <path>, making equality checks fail.
    expect(numberPath).toEqual(objectPath);
  });
});
