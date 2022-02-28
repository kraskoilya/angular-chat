import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BaseUrlInterceptor } from './core/interceptors/api-http.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AUTH_TOKEN_STORAGE_KEY } from './core/mics/injection-tokens';
import { SharedModule } from './shared/shared.module';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#e3f6fc',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 15,
  bgsType: SPINNER.ballScaleMultiple, // background spinner type
  fgsType: SPINNER.ballScaleMultiple, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  hasProgressBar: false,
};

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
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule.forRoot({
      exclude: ['/login'],
    }),
    NgxUiLoaderHttpModule,
    // .forRoot({
    //   exclude: [`${environment.apiUrl}/auth/logout`],
    // })
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
