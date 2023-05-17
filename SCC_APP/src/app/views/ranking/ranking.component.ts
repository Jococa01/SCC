import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Title} from "@angular/platform-browser";
import { Team } from 'src/app/models/response';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  public TeamsArray: Array<any>[]=[];
  public DiffArry: Array<any>[] = [];

  constructor(public service: DataService, private titleService:Title) {
    this.titleService.setTitle("Ranking Amateur | Spanish CSGO Community ");
  }

  public getTeams(): void {
    this.service.getTeams().subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:Team[]){

    let loader = document.getElementsByClassName('loader')[0];
    loader.classList.add('hidden');

    let nullcount = 0;
    let newArray = [];
    let formatDiff = "-";
    for(let i = 0; i<response.length; i++){
      if(response[i].DIFF!=0){
        if(response[i].DIFF>0){
          formatDiff ="▲ "+Math.abs(response[i].DIFF);
        }else{
          formatDiff ="▼ "+Math.abs(response[i].DIFF);
        }
      }
      newArray[i] = [response[i].RANKING, response[i].NAME, response[i].LOGO, response[i].FLAG, response[i].ID,formatDiff,response[i].DIFF];
      if(newArray[i][0] == null ){
        nullcount++;
      }
    }
    
    if(newArray.length < 10 ){
      for(let i = response.length; i<10; i++){
        newArray.push([i+1-nullcount, "Team Name", "def_logo", "international",undefined,"-"])
      }
    }

    for(let i = 0; i<newArray.length; i++){
      if(newArray[i][0] == null ){
        newArray.splice(i,1);
        newArray.push([newArray.length+1, "Team Name", "def_logo", "international",undefined,"-"]);
      }
    }

    console.log(newArray);
    
    this.TeamsArray = newArray;
  }

  ngOnInit(){
    this.getTeams();
  }

}
