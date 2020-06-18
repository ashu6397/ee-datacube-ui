import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from './safe.pipe';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapWorkspaceComponent } from './map-workspace/map-workspace.component';
import { AppService } from './app.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

export function initApp(appService: AppService, httpClient: HttpClient) {
  return async () => {
    appService.accumulator = 0;
    const limit = await httpClient.get('../assets/ee-apps/config.json').toPromise() as {};
    appService.selectedComponent = 'LANDING';
    const timeInterval = setInterval(() => {
      appService.accumulator += 1000;
      if (limit['bannerTimeout'] * 1000 == appService.accumulator) {
        appService.selectedComponent = 'DASHBOARD';
        clearInterval(timeInterval);
      }
    }, 1000);
    appService.limit = limit['bannerTimeout'];
    appService.bannerTimeInterval = timeInterval;
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    SafePipe,
    LandingComponent,
    DashboardComponent,
    MapWorkspaceComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  providers: [SafePipe, {
    provide: APP_INITIALIZER,
    useFactory: initApp,
    multi: true,
    deps: [AppService, HttpClient]
  }],
  bootstrap: [AppComponent]
})
@Injectable({
  providedIn: AppService
})
export class AppModule { }
