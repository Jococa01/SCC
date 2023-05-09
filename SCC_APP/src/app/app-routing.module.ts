import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './views/ranking/ranking.component';
import { PlayerComponent } from './views/player/player.component';
import { TeamComponent } from './views/team/team.component';
import { FaComponent } from './views/fa/fa.component';

const routes: Routes = [
  {path: 'team/:id', component: TeamComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'free-agents', component: FaComponent},
  {path: '', redirectTo:'/ranking', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
