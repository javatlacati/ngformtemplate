import {Component} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {Observable} from "rxjs";
import {SurveyTemplateService} from "../../../services/survey-template.service";

@Component({
  selector: 'app-survey-template-list',
  templateUrl: './survey-template-list.component.html',
  styleUrls: ['./survey-template-list.component.scss']
})
export class SurveyTemplateListComponent {
  surveyTemplates$: Observable<SurveyTemplate[]>;

  constructor(private surveyTemplateService: SurveyTemplateService) {
    this.surveyTemplates$ = surveyTemplateService.getSurveyTemplates();
  }

  deleteTemplate(surveyTemplateId: number) {
    alert(`deleting ${surveyTemplateId}`)
    this.surveyTemplateService.deleteSurveyTemplateById(surveyTemplateId)
    //TODO reload
  }
}
