import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public canSearch: boolean = true;
  public players:any = [];
  public teams:any = [];

  public typingTimer:any;                //timer identifier
  public doneTypingInterval:number = 100;  //time in ms, 5 seconds for example

  // public typying: boolean = false;
  // public TeamID: string ="";

  constructor(public service: DataService) {}

  public getPlayer(nick:string): void {
    this.service.queryPlayers(nick).subscribe((response) => {this.responseToArray(response)});
  }

  public getTeam(nick:string): void {
    this.service.queryTeams(nick).subscribe((response) => {this.responseToArray2(response)});
  }

  public responseToArray(response:any){
    // this.canSearch=true;
    this.players = [];
    for(let n = 0; n<response.length; n++){
      let name = response[n].NAME;
      let splitName = name.split(" ");
      let fName = "";
      for(let i = 0; i<splitName.length; i++){
        if(i == 0){
          fName+=splitName[i]+" \""+response[n].NICK+"\" ";
        }else{
          fName+=splitName[i]+" ";
        }
      }
      this.players.push([fName,response[n].FLAG,response[n].ID]);
    }
    console.log(this.players);
  }

  public responseToArray2(response:any){
    // this.canSearch=true;
    // console.log("obtengo respuesta");
    
    this.teams = [];
    for(let n = 0; n<response.length; n++){
      console.log(response);
      let name = response[n].NAME;
      // let splitName = name.split(" ");
      // let fName = "";
      // for(let i = 0; i<splitName.length; i++){
      //   if(i == 0){
      //     fName+=splitName[i]+" \""+response[n].NICK+"\" ";
      //   }else{
      //     fName+=splitName[i]+" ";
      //   }
      // }
      this.teams.push([name,response[n].LOGO,response[n].ID]);
    }
    // console.log(this.players);
  }

  ngOnInit() {

  }

  //on keyup, start the countdown
  public keyup(event:Event) {
    const myInput = event.target as HTMLInputElement;
    clearTimeout(this.typingTimer);
    if (myInput.value.length>1 && this.canSearch) {
      this.typingTimer = setTimeout(()=>{
          console.log("hago búsqueda");
          // this.canSearch = false;
          this.getPlayer(myInput.value);
          this.getTeam(myInput.value);
      }, this.doneTypingInterval);
    } else{
      this.players = [];
      this.teams = [];
    }
  }

}
