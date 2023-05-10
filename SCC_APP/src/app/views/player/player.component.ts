import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  constructor(public service: DataService,private activatedRoute: ActivatedRoute, private titleService:Title) {}

}
