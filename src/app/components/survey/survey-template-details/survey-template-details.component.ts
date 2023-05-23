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

@Component({
  selector: 'app-survey-template-details',
  templateUrl: './survey-template-details.component.html',
  styleUrls: ['./survey-template-details.component.scss']
})
export class SurveyTemplateDetailsComponent implements OnInit {
  surveyTemplate: SurveyTemplate | null = null;
  debugMode = false
  editing = false

  constructor(
    private route: ActivatedRoute,
    private surveyTemplateService: SurveyTemplateService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    if (id) {
      this.getSurveyTemplateById(id);
    }
  }

  getSurveyTemplateById(id: number) {
    this.surveyTemplateService.getSurveyTemplateById(id)
      .subscribe(surveyTemplate => this.surveyTemplate = surveyTemplate);
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

  deleteSection(sectionId: number) {

  }

  addQuestionToSection(sectionId: number) {

  }

  addSection() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
      let createdSection = this.surveyTemplateService.createSection(this.surveyTemplate?.surveyTemplateId, result['data']);
      createdSection?.subscribe((aValue: Section | null) => {
          console.log(`ready to reload ${JSON.stringify(aValue)}`)
          if (aValue != null) {
            this.surveyTemplate?.sections.push(aValue)
          }
        }
      )
      this.surveyTemplateService.updateSurveyTemplate(this.surveyTemplate)?.subscribe(
        returned => console.log(returned)
      )
      //TODO reload
    });
  }

  deleteQuestion(questionId: number) {

  }

  editSectionName(sectionId: number) {

  }
}
