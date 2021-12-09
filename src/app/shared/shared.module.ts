import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [FormsModule, ReactiveFormsModule, InlineSVGModule, PipesModule],
})
export class SharedModule {}
