import {Component, OnInit} from '@angular/core';
import {SurveyTemplate} from "../../../model/SurveyTemplate";
import {SurveyTemplateService} from "../../../services/survey-template.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-survey-template-details',
  templateUrl: './survey-template-details.component.html',
  styleUrls: ['./survey-template-details.component.scss']
})
export class SurveyTemplateDetailsComponent implements OnInit {
  surveyTemplate: SurveyTemplate| null = null;

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

}
