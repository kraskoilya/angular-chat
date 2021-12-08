import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, ProfileComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [ShellComponent],
})
export class ShellModule {}
