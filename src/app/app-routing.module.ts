import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { IndustryComponent } from './components/industry/industry.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TrackerComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'industry', component: IndustryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
