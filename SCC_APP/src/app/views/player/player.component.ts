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

  public PlayerID: string = "";
  public Nick: string = "";
  public Name: string = "";
  public FullName: string = "";
  public PlayerPhoto: string = "";
  public PlayerFlag: string = "";
  public PlayerRole: string = "";
  public Age: string = "no data";
  public Team: string = "";
  public TeamID: string = "";
  // Faceit
  public FaceitLvl: string = "No data";
  public FaceitElo: string = "No data";
  public FaceitKD: string = "No data";
  public FaceitHS: string = "No data";
  // Error Handling
  public error: boolean = false;

  constructor(public service: DataService,private activatedRoute: ActivatedRoute, private titleService:Title) {}

  public getPlayer(id:string): void {
    this.service.getPlayer(id).subscribe((response) => {this.responseToArray(response)});
  }

  public getFaceitPlayer(nick:string): void {
    if(this.error == false){
        this.service.getFaceitPlayer(nick).subscribe((response) => {this.responseToArray2(response)},
      error => {
        let loader = document.getElementsByClassName('loader')[0];
        loader.classList.add('hidden');
        this.error = true;
      });
    }
  }

  public getFaceitPlayerStats(id:string): void {
    this.service.getFaceitPlayerStats(id).subscribe((response) => {this.responseToArray3(response)});
  }

  public responseToArray(response:any){
    
    // let loader = document.getElementsByClassName('loader')[0];
    // loader.classList.add('hidden');
    // console.log(response[0].NAME);
    this.titleService.setTitle(response[0].NICK+"'s Player Profile | Spanish CSGO Community");

    this.Team = response[0].TEAM.NAME;
    this.TeamID = response[0].TEAM.ID;
    this.PlayerPhoto = response[0].PHOTO;
    this.PlayerFlag = response[0].FLAG;
    this.PlayerRole = response[0].ROLE;
    // this.Age = response[0].AGE;
    

    // if(this.Team==undefined){this.Team = "F/A";}
    

    if(response[0].AGE!=""){
      this.Age = response[0].AGE;
    }

    // console.log(this.Age);
    

    let NSN = response[0].NAME.split(" ");
    console.log(NSN);

    for(let i = 0; i<NSN.length; i++){
      if(i == 0){
        this.FullName+=NSN[i]+'\n"'+response[0].NICK+'"\n';
      }else{
        this.FullName+=NSN[i]+' ';
      }
    }
    
    
    // let nPlayers = 5;
    // let newArray = [];
    // console.log(response);
    // this.TeamName = response[0].NAME;
    // this.titleService.setTitle(this.TeamName+" team page | Spanish CSGO Community");
    // this.TeamLogo = response[0].LOGO;
    // this.TeamFlag = response[0].FLAG;
    // console.log(this.TeamLogo);
    
    this.getFaceitPlayer(response[0].NICK);
  }

  public responseToArray2(response:any){
    console.log(response);
        
    let csgoData = response.games["csgo"];
    this.FaceitLvl = csgoData.skill_level;
    this.FaceitElo = csgoData.faceit_elo;

    this.getFaceitPlayerStats(response.player_id);

  }

  public responseToArray3(response:any){
    this.FaceitKD = response.lifetime["Average K/D Ratio"];
    this.FaceitHS = response.lifetime["Average Headshots %"]+"%";
    let loader = document.getElementsByClassName('loader')[0];
    loader.classList.add('hidden');
  }


  ngOnInit() {
    this.PlayerID = this.activatedRoute.snapshot.params['id'];
    this.getPlayer(this.PlayerID);
  }

  // public calcYear(dateSent:any){
  //     let currentDate = new Date().getTime();
  //     let pastTime = Date.parse(dateSent);
  //     let difference = Math.abs(currentDate - pastTime);
  //     let yearDiff =  Math.floor(difference / (1000 * 60 * 60 * 24) / 365);
  //     return yearDiff;
  // }

}
