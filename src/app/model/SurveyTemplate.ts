import {Section} from "./Section";

export class SurveyTemplate {
  surveyTemplateId: number | null = null;
  uuid = '';
  sections: Section[] = [];
}
