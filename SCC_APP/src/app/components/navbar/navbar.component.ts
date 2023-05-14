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
  // public TeamID: string ="";

  constructor(public service: DataService) {}

  public getPlayer(nick:string): void {
    this.service.queryPlayers(nick).subscribe((response) => {this.responseToArray(response)});
  }

  public responseToArray(response:any){
    this.canSearch=true;
    for(let n = 0; n<response.length; n++){
      this.players.push(response[n].NICK);
    }
    console.log(this.players);
  }

  ngOnInit() {
    let sb = <HTMLInputElement>document.getElementById('search')!;
    sb.addEventListener('input',(e)=>{
      console.log(sb.value);
      if(sb.value.length>1 && this.canSearch==true){
        this.canSearch = false;
        this.players = [];
        this.getPlayer(sb.value);
      }else{
        this.players = [];
      }
    });
    // this.TeamID = this.activatedRoute.snapshot.params['id'];
    // this.getPlayer(this.TeamID);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  // }

}
