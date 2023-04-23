import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './views/ranking/ranking.component';
import { PlayerComponent } from './views/player/player.component';
import { TeamComponent } from './views/team/team.component';

const routes: Routes = [
  {path: 'team/:id', component: TeamComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'ranking', component: RankingComponent},
  {path: '', redirectTo:'/ranking', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
