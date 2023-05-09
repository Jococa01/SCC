import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './views/player/player.component';
import { TeamComponent } from './views/team/team.component';
import { FaComponent } from './views/fa/fa.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RankingComponent,
    PlayerComponent,
    TeamComponent,
    FaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
