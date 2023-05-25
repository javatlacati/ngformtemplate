import {Component, OnInit} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {SurveyTemplateService} from "../../../services/survey-template.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../../model/Question";
import {MatDialog} from "@angular/material/dialog";
import {NewSectionDialogComponent} from "../dialogs/new-section-dialog/new-section-dialog.component";
import {Section} from "../../../model/Section";
import {QuestionType} from "../../../model/QuestionType";
import {MultipleOptionQuestion} from "../../../model/MultipleOptionQuestion";
import {Observable, startWith, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-survey-template-details',
  templateUrl: './survey-template-details.component.html',
  styleUrls: ['./survey-template-details.component.scss']
})
export class SurveyTemplateDetailsComponent implements OnInit {
  surveyTemplate: SurveyTemplate | null = null;
  debugMode = false
  editing = false

  private readonly refreshSurveyTemplates$ = new Subject<void>();

  templateObservable$: Observable<SurveyTemplate> = new Observable<SurveyTemplate>();

  constructor(
    private route: ActivatedRoute,
    private surveyTemplateService: SurveyTemplateService,
    public dialog: MatDialog
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    if (id) {
      this.getSurveyTemplateById(id);
      this.templateObservable$ = this.refreshSurveyTemplates$.pipe(
        startWith(undefined),
        switchMap(() => this.surveyTemplateService.getSurveyTemplateById(id))
      );
    }
    this.templateObservable$.subscribe(template => this.surveyTemplate = template)

  }

  ngOnInit() {
    this.refreshSurveyTemplates$.next()
  }

  getSurveyTemplateById(id: number) {

    // templateObservable
    //   .subscribe(surveyTemplate => this.surveyTemplate = surveyTemplate);
  }

  getOptions(question: Question): string[] {
    console.log(`type: ${question.questionType}`)
    if (question.questionType === QuestionType.MULTIPLE_OPTION) {
      let answerOptions = (question as MultipleOptionQuestion).answerOptions;
      console.log(`answerOptions: ${answerOptions}`)
      return answerOptions
    } else {
      return []
    }
  }

  enableEdition() {
    this.editing = !this.editing
  }

  deleteSection(sectionId: number | null) {
    if (this.surveyTemplate) {
      this.surveyTemplate.sections = this.surveyTemplate.sections.filter((value) => value.sectionId != sectionId)
      //TODO delete section from db
      this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
        returned => {
          console.log(JSON.stringify(returned))
          this.refreshSurveyTemplates$.next()
        }
      )
    }
  }

  addQuestionToSection(sectionId: number | null) {
    if (sectionId) {

    }
  }

  addSection() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      let section = new Section();
      section.name = result.data
      this.surveyTemplate?.sections.push(section)
      this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
        returned => {
          console.log(JSON.stringify(returned))
          this.refreshSurveyTemplates$.next()
        }
      )

    });
  }

  deleteQuestion(questionId: number | null) {

  }

  editSectionName(sectionId: number | null) {

  }
}
