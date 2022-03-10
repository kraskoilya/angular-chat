import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModulesModule } from '../nz-modules/nz-modules.module';
import { ChatCreateComponent } from './chat-create/chat-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [ChatCreateComponent, UserUpdateComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzModulesModule],
  exports: [ChatCreateComponent, UserUpdateComponent],
  entryComponents: [ChatCreateComponent, UserUpdateComponent],
})
export class ModalsModule {}
