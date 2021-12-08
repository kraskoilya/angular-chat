import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BaseUrlInterceptor } from './core/interceptors/api-http.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AUTH_TOKEN_STORAGE_KEY } from './core/mics/injection-tokens';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    InlineSVGModule.forRoot({
      baseUrl: '/assets/icons',
    }),
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: AUTH_TOKEN_STORAGE_KEY,
      useValue: 'my_chat',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
