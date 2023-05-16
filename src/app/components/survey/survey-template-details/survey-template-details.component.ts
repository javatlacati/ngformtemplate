import {Component, OnInit} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {SurveyTemplateService} from "../../../services/survey-template.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../../model/Question";
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
    private surveyTemplateService: SurveyTemplateService
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
    console.log(`type: ${question.type}`)
    if (question.type === 'MultipleOptionQuestion') {
      let answerOptions = (question as MultipleOptionQuestion).answerOptions;
      console.log(`answerOptions: ${answerOptions}`)
      return answerOptions
    } else {
      return []
    }
  }

  enableEdition() {
    this.editing=!this.editing
  }

  deleteSection(sectionId: number) {

  }

  addQuestionToSection(sectionId: number) {

  }

  addSection(surveyTemplateId?: number) {

  }

  deleteQuestion(questionId?: number) {

  }
}
