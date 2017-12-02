import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdoButtonModule } from '@ctrl/ngx-github-buttons';
import { NouisliderModule } from 'ng2-nouislider';

import { TrendModule } from '../lib/trend/trend.module';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { FooterComponent } from './footer/footer.component';
import { GradientPreviewComponent } from './gradient-preview/gradient-preview.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { TrendCodeComponent } from './trend-code/trend-code.component';

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

    NouisliderModule,
    MdoButtonModule,

    TrendModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
