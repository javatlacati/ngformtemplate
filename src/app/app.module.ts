import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SectionComponent} from "./components/survey/section-component/section.component";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {SurveyTemplateListComponent} from './components/survey/survey-template-list/survey-template-list.component';
import {HttpClientModule} from "@angular/common/http";
import {
  SurveyTemplateDetailsComponent
} from './components/survey/survey-template-details/survey-template-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NewSectionDialogComponent} from './components/survey/dialogs/new-section-dialog/new-section-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { NewQuestionDialogComponent } from './components/survey/dialogs/new-question-dialog/new-question-dialog.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    SurveyTemplateListComponent,
    SurveyTemplateDetailsComponent,
    NewSectionDialogComponent,
    NewQuestionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkAccordionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
