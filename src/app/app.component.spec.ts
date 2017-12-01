import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NouisliderModule } from 'ng2-nouislider';

import { TrendModule } from '../lib/trend/trend.module';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { FooterComponent } from './footer/footer.component';
import { GithubLinkComponent } from './github-link/github-link.component';
import { GradientPreviewComponent } from './gradient-preview/gradient-preview.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { TrendCodeComponent } from './trend-code/trend-code.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ConfigComponent,
        FooterComponent,
        GithubLinkComponent,
        GradientPreviewComponent,
        HeaderComponent,
        SliderComponent,
        TrendCodeComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,

        NouisliderModule,

        TrendModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular Trend');
  }));
});
