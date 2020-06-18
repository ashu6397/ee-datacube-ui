import { Component, OnInit } from '@angular/core';
import { AppService, EarthEngineApp } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  selectApp(app: EarthEngineApp) {
    if (!app.appSrc && app.appSrc.length == 0)
      return;
    if (!this.appService.visitedApps.includes(app)) {
      this.appService.visitedApps.push(app);
      this.appService.appsReference[app.id]['visited'] = this.appService.appsReference[app.id]['visited'] || true;
    }
    this.appService.sendMessage(app);
    this.appService.selectedComponent = 'MAP_WORKSPACE';
  }
}
