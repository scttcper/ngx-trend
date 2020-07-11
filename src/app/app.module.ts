import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { GhButtonModule } from '@ctrl/ngx-github-buttons';

import { TrendModule } from '../lib/trend/trend.module';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { FooterComponent } from './footer.component';
import { GradientPreviewComponent } from './gradient-preview.component';
import { HeaderComponent } from './header.component';
import { SliderComponent } from './slider.component';
import { TrendCodeComponent } from './trend-code.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    FooterComponent,
    GradientPreviewComponent,
    HeaderComponent,
    SliderComponent,
    TrendCodeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatSliderModule,
    GhButtonModule,

    TrendModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
