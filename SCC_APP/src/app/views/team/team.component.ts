import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  public TeamID: string = "";
  public Players: any=[];
  public TeamName: string = "";
  public TeamLogo: string = "";
  public TeamFlag: string = "";

  constructor(public service: DataService,private activatedRoute: ActivatedRoute) {}

  public getPlayers(id:string): void {
    this.service.getTeamPlayers(id).subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    let nPlayers = 5;
    let newArray = [];
    console.log(response);
    this.TeamName = response[0].NAME;
    for(let i = 0; i<response[0].PLAYERS.length; i++){
      newArray[i] = [response[0].PLAYERS[i].ID,response[0].PLAYERS[i].NICK,response[0].PLAYERS[i].NAME,response[0].PLAYERS[i].FLAG];
    }
    if(newArray.length<nPlayers){
      for(let i = newArray.length; i<nPlayers; i++){
        newArray.push(["","?","",""]);
      }
    }
    this.Players = newArray;
    console.log(this.Players);
    
  }


  ngOnInit() {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.activatedRoute.queryParams.subscribe(params => {
        this.TeamID= params['id'];
        console.log("La id del equipo es "+this.TeamID);
        this.getPlayers(this.TeamID);
      });
  }

}
