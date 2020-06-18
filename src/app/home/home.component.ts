import { Component, OnInit } from '@angular/core';
import { AppService, EarthEngineApp } from '../app.service';
import * as UUID from 'uuid';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public appService: AppService) {
    this.initAppList();
  }

  ngOnInit(): void { }

  async initAppList() {
    this.appService.appsList = await this.appService.getAppsData().toPromise() as EarthEngineApp[];
    this.appService.appsList.forEach((app) => {
      app.id = UUID.v4();
      this.appService.appsReference[app.id] = {};
    });
  }
}
