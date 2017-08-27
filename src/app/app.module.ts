import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NouisliderModule } from 'ng2-nouislider';

import { AppComponent } from './app.component';
import { TrendModule } from '../lib';
import { ConfigComponent } from './config/config.component';
import { FooterComponent } from './footer/footer.component';
import { GithubLinkComponent } from './github-link/github-link.component';
import { GradientPreviewComponent } from './gradient-preview/gradient-preview.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { TrendCodeComponent } from './trend-code/trend-code.component';

@NgModule({
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
