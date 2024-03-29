import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {Title} from "@angular/platform-browser";

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
  public TeamRanking: string = ""

  constructor(public service: DataService,private activatedRoute: ActivatedRoute, private titleService:Title) {}

  public getPlayers(id:string): void {
    this.service.getTeamPlayers(id).subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    let loader = document.getElementsByClassName('loader')[0];
    loader.classList.add('hidden');
    let nPlayers = 5;
    let newArray = [];
    console.log(response);
    this.TeamName = response[0].NAME;
    this.titleService.setTitle(this.TeamName+"'s team page | Spanish CSGO Community");
    this.TeamLogo = response[0].LOGO;
    this.TeamFlag = response[0].FLAG;
    this.TeamRanking = response[0].RANKING;
    console.log(this.TeamLogo);
    if(response[0].PLAYERS != "none"){
      for(let i = 0; i<response[0].PLAYERS.length; i++){
        newArray[i] = [response[0].PLAYERS[i].ID,response[0].PLAYERS[i].NICK,response[0].PLAYERS[i].NAME,response[0].PLAYERS[i].FLAG,response[0].PLAYERS[i].PHOTO,response[0].PLAYERS[i].ROLE];
        if(response[0].PLAYERS[i].NICK.length>12){
          let name = response[0].PLAYERS[i].NICK;
          let shortname = name.slice(0,9);
          shortname = shortname+"...";
          newArray[i] = [response[0].PLAYERS[i].ID,shortname,response[0].PLAYERS[i].NAME,response[0].PLAYERS[i].FLAG,response[0].PLAYERS[i].PHOTO,response[0].PLAYERS[i].ROLE];
        }
      }
      
      if(newArray.length<nPlayers){
        for(let i = newArray.length; i<nPlayers; i++){
          newArray.push(["","?","","","default"]);
        }
      }else if(newArray.length>nPlayers){
        for(let i = 0; i<newArray.length; i++){
          if(i>3){
            newArray.pop();
          }
        }
      }
    }else{
      for(let n = 0; n<nPlayers; n++){
        newArray.push(["","?","","","default"]);
      }
    }

    this.Players = newArray;
    console.log(this.Players);
    
  }


  ngOnInit() {
    this.TeamID = this.activatedRoute.snapshot.params['id'];
    this.getPlayers(this.TeamID);
  }

}
