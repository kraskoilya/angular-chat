import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzModalModule,
  ],
  exports: [NzButtonModule, NzIconModule, NzModalModule, NzModalModule],
})
export class NzModulesModule {}
