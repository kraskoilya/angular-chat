import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, NavComponent],
  imports: [CommonModule],
  exports: [ShellComponent],
})
export class ShellModule {}
