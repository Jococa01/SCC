import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  public TeamID: string = "";

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.activatedRoute.queryParams.subscribe(params => {
        this.TeamID= params['id'];
        console.log("La id del equipo es "+this.TeamID);
      });
  }

}
