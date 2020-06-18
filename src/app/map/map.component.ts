import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input('appLink') appLink: string;

  isLoaderHidden: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  hideLoader() {
    console.debug('map-loaded');
    this.isLoaderHidden = true;
  }

}
