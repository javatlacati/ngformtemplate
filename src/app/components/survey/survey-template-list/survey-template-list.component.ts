import {Component, OnDestroy} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {SurveyTemplateService} from "../../../services/survey-template.service";

@Component({
  selector: 'app-survey-template-list',
  templateUrl: './survey-template-list.component.html',
  styleUrls: ['./survey-template-list.component.scss']
})
export class SurveyTemplateListComponent implements OnDestroy {
  private readonly refreshSurveyTemplates$ = new Subject<void>();
  surveyTemplates$: Observable<SurveyTemplate[]>;

  constructor(private surveyTemplateService: SurveyTemplateService) {
    this.surveyTemplates$ = this.refreshSurveyTemplates$.pipe(
      // fake emission of a click so that initial data can be loaded
      startWith(undefined),
      switchMap(() => this.surveyTemplateService.getSurveyTemplates())
    )
  }

  deleteTemplate(surveyTemplateId: number | null) {
    // alert(`deleting ${surveyTemplateId}`)
    if (surveyTemplateId) {
      this.surveyTemplateService.deleteSurveyTemplateById(surveyTemplateId).subscribe(
        () => this.refreshSurveyTemplates$.next()
      )
    }
  }

  creaNuevaPlantilla() {
    this.surveyTemplateService.createSurvey()
      .subscribe(() => {
        this.refreshSurveyTemplates$.next()
      })

  }

  ngOnDestroy(): void {
    this.refreshSurveyTemplates$.complete()
  }
}
