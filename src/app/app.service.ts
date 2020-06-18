import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface EarthEngineApp {
  id: string;
  label: string;
  appSrc: string;
}
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient) { }
  selectedComponent: string = 'DASHBOARD';
  appsList: EarthEngineApp[] = [];
  appsReference: {} = {};
  visitedApps: EarthEngineApp[] = [];
  private message = new Subject<EarthEngineApp>();
  bannerTimeInterval: any;
  accumulator: number;
  limit: number;

  getMessage(): Observable<EarthEngineApp> {
    return this.message.asObservable();
  }
  sendMessage(app: EarthEngineApp) {
    this.message.next(app);
  }

  getAppsData() {
    let url = "./assets/ee-apps/apps.json";
    return this.httpClient.get(url);
  }
  skipBanner() {
    clearInterval(this.bannerTimeInterval);
    this.selectedComponent = 'DASHBOARD';
  }
}
