import {Component} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {SurveyTemplateService} from "../../../services/survey-template.service";

@Component({
  selector: 'app-survey-template-list',
  templateUrl: './survey-template-list.component.html',
  styleUrls: ['./survey-template-list.component.scss']
})
export class SurveyTemplateListComponent {
  private readonly refreshSurveyTemplates$ = new Subject<void>();
  surveyTemplates$: Observable<SurveyTemplate[]>;

  constructor(private surveyTemplateService: SurveyTemplateService) {
    this.surveyTemplates$ = this.refreshSurveyTemplates$.pipe(
      // fake emission of a click so that initial data can be loaded
      startWith(undefined),
      switchMap(() => this.surveyTemplateService.getSurveyTemplates())
    )
  }

  deleteTemplate(surveyTemplateId: number) {
    alert(`deleting ${surveyTemplateId}`)
    this.surveyTemplateService.deleteSurveyTemplateById(surveyTemplateId)
    //TODO reload
  }

  creaNuevaPlantilla() {
    this.surveyTemplateService.createSurvey()
      .subscribe(value => {
        this.surveyTemplates$ = this.refreshSurveyTemplates$.pipe(
          // fake emission of a click so that initial data can be loaded
          startWith(undefined),
          switchMap(() => this.surveyTemplateService.getSurveyTemplates())
        )
    })

  }
}
