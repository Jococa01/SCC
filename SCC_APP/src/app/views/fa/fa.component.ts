import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-fa',
  templateUrl: './fa.component.html',
  styleUrls: ['./fa.component.css']
})
export class FaComponent {
  public PlayerArray: Array<string>[]=[];

  constructor(public service: DataService) {}

  public getPlayers(): void {
    this.service.getFaPlayers().subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    let nullcount = 0;
    let newArray = [];
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

    // for(let i = 0; i<newArray.length; i++){
    //   if(newArray[i][0] == null ){
    //     newArray.splice(i,1);
    //     newArray.push([newArray.length+1, "Team Name", "def_logo", "international"]);
    //   }
    // }

    // console.log(newArray);
    
    this.PlayerArray = newArray;
  }

  ngOnInit(){
    this.getPlayers();
  }
}
