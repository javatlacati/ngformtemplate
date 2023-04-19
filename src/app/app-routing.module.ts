import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SurveyTemplateListComponent} from "./components/survey/survey-template-list/survey-template-list.component";

const routes: Routes = [
  { path:'', component: SurveyTemplateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
