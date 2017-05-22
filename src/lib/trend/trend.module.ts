import { NgModule, ModuleWithProviders, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendComponent } from './trend.component';

@NgModule({
  imports: [CommonModule],
  exports: [TrendComponent],
  declarations: [TrendComponent],
})
export class TrendModule {
}
