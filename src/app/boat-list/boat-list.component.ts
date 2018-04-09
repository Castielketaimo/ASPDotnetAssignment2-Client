import { BoatsService } from './../service/boats.service';

import { Component, OnInit } from '@angular/core';
import { Boat } from '../Models/Boat';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {

  boats: Boat[];
  constructor(private boatsService: BoatsService) { }
  ngOnInit() {
    this.getFleets();
  }

  getFleets(): void {
    this.boatsService.getFleets()
      .then(boats => this.boats = boats);
  }
}
