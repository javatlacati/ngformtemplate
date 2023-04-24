import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SurveyTemplateListComponent} from "./components/survey/survey-template-list/survey-template-list.component";
import {
  SurveyTemplateDetailsComponent
} from "./components/survey/survey-template-details/survey-template-details.component";

const routes: Routes = [
  { path:'', component: SurveyTemplateListComponent},
  { path: 'templates/:id', component: SurveyTemplateDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
