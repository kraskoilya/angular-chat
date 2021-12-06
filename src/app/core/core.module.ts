import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { ShellModule } from './shell/shell.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShellModule, AuthModule],
})
export class CoreModule {}
