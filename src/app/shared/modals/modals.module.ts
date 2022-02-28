import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModulesModule } from '../nz-modules/nz-modules.module';
import { ChatCreateComponent } from './chat-create/chat-create.component';

@NgModule({
  declarations: [ChatCreateComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzModulesModule],
  exports: [ChatCreateComponent],
  entryComponents: [ChatCreateComponent],
})
export class ModalsModule {}
