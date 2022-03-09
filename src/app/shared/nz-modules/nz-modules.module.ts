import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzModalModule,
    NzSelectModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzModalModule,
    NzSelectModule,
  ],
})
export class NzModulesModule {}
