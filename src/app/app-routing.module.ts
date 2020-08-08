import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { GifDetailsComponent } from './gif-details/gif-details.component';

const routes: Routes = [
  { path: 'gifs/:id', component: GifDetailsComponent },
  { path: 'gifs', component: ResultsListComponent },
  { path: '', redirectTo: 'gifs', pathMatch: 'full' },
  { path: '**', redirectTo: 'gifs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
