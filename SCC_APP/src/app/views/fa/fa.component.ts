import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-fa',
  templateUrl: './fa.component.html',
  styleUrls: ['./fa.component.css']
})
export class FaComponent {
  public PlayerArray: Array<string>[]=[];
  // public isLoaded = false;

  constructor(public service: DataService, private titleService:Title) {
    this.titleService.setTitle("Free Agents | Spanish CSGO Community ");
  }

  public getPlayers(): void {
    this.service.getFaPlayers().subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    let nullcount = 0;
    let newArray = [];
    // this.isLoaded=true;
    let loader = document.getElementsByClassName('loader')[0];
    loader.classList.add('hidden');
    for(let i = 0; i<response.length; i++){
      newArray[i] = [response[i].NICK, response[i].PHOTO, response[i].NAME, response[i].FLAG, response[i].ID];
      // if(newArray[i][0] == null ){
      //   nullcount++;
      // }
    }
    
    // if(newArray.length < 10 ){
    //   for(let i = response.length; i<10; i++){
    //     newArray.push([i+1-nullcount, "Team Name", "def_logo", "international"])
    //   }
    // }

    // if(newArray.length == 0 ){
    //   newArray.push(["Player Name","default", "", "international", "international"]);
    // }

    // console.log(newArray);
    
    this.PlayerArray = newArray;
    console.log(this.PlayerArray);
    
  }

  ngOnInit(){
    this.getPlayers();
  }
}
