import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ChatsService } from 'src/app/chat/services/chats.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, ProfileComponent],
  imports: [CommonModule, SharedModule, RouterModule, NzDropDownModule],
  exports: [ShellComponent],
  providers: [ChatsService],
})
export class ShellModule {}
