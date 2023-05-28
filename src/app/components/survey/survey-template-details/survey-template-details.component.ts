import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {SurveyTemplateService} from "../../../services/survey-template.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../../model/Question";
import {MatDialog} from "@angular/material/dialog";
import {NewSectionDialogComponent} from "../dialogs/new-section-dialog/new-section-dialog.component";
import {Section} from "../../../model/Section";
import {MultipleOptionQuestion} from "../../../model/MultipleOptionQuestion";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {NewQuestionDialogComponent} from "../dialogs/new-question-dialog/new-question-dialog.component";

@Component({
  selector: 'app-survey-template-details',
  templateUrl: './survey-template-details.component.html',
  styleUrls: ['./survey-template-details.component.scss']
})
export class SurveyTemplateDetailsComponent implements OnInit, OnDestroy {
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

  getOptions(question: Question): string[] {
    console.log(`type: ${question.type}`)
    if (question.type == 'MULTIPLE_OPTION') {
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

  addSection() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent, {data: {verbo: 'Agregar'}});
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
    if (this.surveyTemplate) {
      if (this.surveyTemplate.sections && this.surveyTemplate.sections.length) {
        let currentSection = this.surveyTemplate.sections.find((aSection) => aSection.questions.find((aQuestion) => aQuestion.questionId === questionId))
        if (currentSection) {
          let filteredQuestions = currentSection.questions.filter((aQuestion) => aQuestion.questionId != questionId)
          currentSection.questions = filteredQuestions
          this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
            returned => {
              console.log(JSON.stringify(returned))
              this.refreshSurveyTemplates$.next()
            }
          )
        }
      }
    }
  }

  editSectionName(sectionId: number | null) {
    const dialogRef = this.dialog.open(NewSectionDialogComponent, {data: {verbo: 'Editar'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      if (this.surveyTemplate) {
        let section = this.surveyTemplate.sections.find((value) => value.sectionId === sectionId)
        if (section) {
          section.name = result.data
          let index = this.surveyTemplate.sections.findIndex((value) => value.sectionId === sectionId)
          this.surveyTemplate.sections[index] = section
          this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
            returned => {
              console.log(JSON.stringify(returned))
              this.refreshSurveyTemplates$.next()
            }
          )
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshSurveyTemplates$.complete()
  }

  save() {
    this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
      returned => {
        console.log(JSON.stringify(returned))
        this.refreshSurveyTemplates$.next()
      }
    )
  }

  addQuestion(section: Section) {
    if (!section.questions) {
      section.questions = []
    }
    const dialogRef = this.dialog.open(NewQuestionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      if (this.surveyTemplate) {
        if (section) {
          if (!section.questions) {
            section.questions = []
          }
          section.questions.push(result.data.question)
          this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
            returned => {
              console.log(JSON.stringify(returned))
              this.refreshSurveyTemplates$.next()
            }
          )
        }
      }
    });
  }
}
