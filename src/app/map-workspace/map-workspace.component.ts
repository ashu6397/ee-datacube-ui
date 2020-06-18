import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AppService, EarthEngineApp } from '../app.service';

@Component({
  selector: 'app-map-workspace',
  templateUrl: './map-workspace.component.html',
  styleUrls: ['./map-workspace.component.css']
})
export class MapWorkspaceComponent implements OnInit {
  @ViewChild('appTab') appTab: MatTabGroup;

  selectedIndex: number = 0;
  constructor(public appService: AppService) {
    this.appService.getMessage().subscribe((app: EarthEngineApp) => {
      console.debug(this.appService.visitedApps.indexOf(app) + 1);
      this.appTab.selectedIndex = this.appService.visitedApps.indexOf(app) + 1;
    })
  }

  ngOnInit(): void { }

  showHide(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
  }

  gotoDashboard() {
    this.appService.selectedComponent = 'DASHBOARD';
  }

  closeTab(app: EarthEngineApp) {
    this.appService.visitedApps.splice(this.appService.visitedApps.indexOf(app), 1);
    this.appService.appsReference[app.id]['visited'] = false;
    if (this.appService.visitedApps.length == 0)
      this.appService.selectedComponent = 'DASHBOARD';
  }

  trackMapIndex(index: number, app: EarthEngineApp) {
    return app.id;
  }
}
