import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  public TeamsArray: Array<string>[]=[];

  constructor(public service: DataService) {}

  public getTeams(): void {
    this.service.getTeams().subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    let newArray = [];
    for(let i = 0; i<response.length; i++){
      newArray[i] = [response[i].RANKING, response[i].NAME, response[i].LOGO, response[i].FLAG, response[i].ID];
    }
    this.TeamsArray = newArray;
  }

  ngOnInit(){
    this.getTeams();
  }

}
