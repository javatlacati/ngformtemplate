import {Component} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {Observable} from "rxjs";
import {SurveyTemplateService} from "../../../services/survey-template.service";
import {MatDialog} from "@angular/material/dialog";
import {NewTemplateDialogComponent} from "../dialogs/new-template-dialog/new-template-dialog.component";

@Component({
  selector: 'app-survey-template-list',
  templateUrl: './survey-template-list.component.html',
  styleUrls: ['./survey-template-list.component.scss']
})
export class SurveyTemplateListComponent {
  surveyTemplates$: Observable<SurveyTemplate[]>;

  constructor(private surveyTemplateService: SurveyTemplateService, public dialog: MatDialog) {
    this.surveyTemplates$ = surveyTemplateService.getSurveyTemplates();
  }

  deleteTemplate(surveyTemplateId: number) {
    alert(`deleting ${surveyTemplateId}`)
    this.surveyTemplateService.deleteSurveyTemplateById(surveyTemplateId)
    //TODO reload
  }

  creaNuevaPlantilla() {
    const dialogRef = this.dialog.open(NewTemplateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }
}
