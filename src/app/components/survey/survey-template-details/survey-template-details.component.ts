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
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  TemplateShareBottomSheetComponent
} from "../bottom-sheets/template-share-bottom-sheet/template-share-bottom-sheet.component";

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
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
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
      return (question as MultipleOptionQuestion).answerOptions
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
      this.updatedTemplateAndRefresh();
    }
  }

  addSection() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent, {data: {verbo: 'Agregar'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      let section = new Section();
      section.name = result.data
      this.surveyTemplate?.sections.push(section)
      this.updatedTemplateAndRefresh()
    });
  }

  deleteQuestion(questionId: number | null) {
    if (this.surveyTemplate) {
      if (this.surveyTemplate.sections && this.surveyTemplate.sections.length) {
        let currentSection = this.surveyTemplate.sections.find((aSection) => aSection.questions.find((aQuestion) => aQuestion.questionId === questionId))
        if (currentSection) {
          currentSection.questions = currentSection.questions.filter((aQuestion) => aQuestion.questionId != questionId)
          this.updatedTemplateAndRefresh()
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
          this.updatedTemplateAndRefresh()
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshSurveyTemplates$.complete()
  }

  updatedTemplateAndRefresh() {
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
          this.updatedTemplateAndRefresh()
        }
      }
    });
  }


  deleteOption(sectionId: number | null, questionId: number | null, option: string) {
    if (sectionId != null) {
      let theSection = this.surveyTemplate?.sections.find((section) => section.sectionId === sectionId);
      if (theSection && theSection.questions) {
        let theQuestion = theSection.questions.find((aQuestion) => aQuestion.questionId === questionId) as MultipleOptionQuestion;
        let idx = theQuestion.answerOptions.findIndex((answer) => answer === option)
        if (idx >= 0) {
          theQuestion.answerOptions.splice(idx, 1);
        }
      }
      this.updatedTemplateAndRefresh()
    }
  }

  addAnswerOption(sectionId: number | null, questionId: number | null) {
    if (questionId) {
      let theSection = this.surveyTemplate?.sections.find((section) => section.sectionId === sectionId);
      if (theSection) {
        let theQuestion = theSection.questions.find((aQuestion) => aQuestion.questionId === questionId) as MultipleOptionQuestion;
        theQuestion.answerOptions.push("")
        this.updatedTemplateAndRefresh()
      }
    }
  }

  editOption(sectionId: number | null, questionId: number | null, optionIdx: number) {
    if (questionId) {
      let theSection = this.surveyTemplate?.sections.find((section) => section.sectionId === sectionId);
      if (theSection) {
        let theQuestion = theSection.questions.find((aQuestion) => aQuestion.questionId === questionId) as MultipleOptionQuestion;
        if (theQuestion) {
          console.log(`selector "#id_${questionId}_${optionIdx}"`)
          let option = document.querySelector("#id_" + questionId + "_" + optionIdx) as HTMLInputElement;
          console.log(`theQuestion.answerOptions[${optionIdx}] = ${option}`)
          if (option) {
            theQuestion.answerOptions[optionIdx] = option.value;
          }
        }
      }
    }

    this.updatedTemplateAndRefresh()
  }

  shareTemplate() {
    this._bottomSheet.open(TemplateShareBottomSheetComponent, {
      data: {uuid: this.surveyTemplate?.uuid}
    });
  }
}
