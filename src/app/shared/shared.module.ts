import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { ModalsModule } from './modals/modals.module';
import { NzModulesModule } from './nz-modules/nz-modules.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NzModulesModule, ModalsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    PipesModule,
    NzModulesModule,
  ],
})
export class SharedModule {}
