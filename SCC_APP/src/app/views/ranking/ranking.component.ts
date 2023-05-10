import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  public TeamsArray: Array<string>[]=[];

  constructor(public service: DataService, private titleService:Title) {
    this.titleService.setTitle("Ranking Amateur | Spanish CSGO Community ");
  }

  public getTeams(): void {
    this.service.getTeams().subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    let nullcount = 0;
    let newArray = [];
    for(let i = 0; i<response.length; i++){
      newArray[i] = [response[i].RANKING, response[i].NAME, response[i].LOGO, response[i].FLAG, response[i].ID];
      if(newArray[i][0] == null ){
        nullcount++;
      }
    }
    
    if(newArray.length < 10 ){
      for(let i = response.length; i<10; i++){
        newArray.push([i+1-nullcount, "Team Name", "def_logo", "international"])
      }
    }

    for(let i = 0; i<newArray.length; i++){
      if(newArray[i][0] == null ){
        newArray.splice(i,1);
        newArray.push([newArray.length+1, "Team Name", "def_logo", "international"]);
      }
    }

    console.log(newArray);
    
    this.TeamsArray = newArray;
  }

  ngOnInit(){
    this.getTeams();
  }

}
