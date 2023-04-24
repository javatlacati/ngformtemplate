import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SurveyTemplate} from "./model/SurveyTemplate";
import {SectionComponent} from "./components/survey/section-component/section.component";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import { SurveyTemplateListComponent } from './components/survey/survey-template-list/survey-template-list.component';
import {HttpClientModule} from "@angular/common/http";
import { SurveyTemplateDetailsComponent } from './components/survey/survey-template-details/survey-template-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    SurveyTemplateListComponent,
    SurveyTemplateDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkAccordionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
