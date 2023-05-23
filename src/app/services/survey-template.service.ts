import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SurveyTemplate} from "../model/SurveyTemplate";
import {Section} from "../model/Section";

@Injectable({
  providedIn: 'root'
})
export class SurveyTemplateService {

  private readonly surveyTemplateUrl = 'http://localhost:8081/template';
  private readonly surveySectionUrl = 'http://localhost:8081/section';

  constructor(private http: HttpClient) {
  }

  getSurveyTemplates(): Observable<SurveyTemplate[]> {
    const url = `${this.surveyTemplateUrl}s`;
    return this.http.get<SurveyTemplate[]>(url);
  }

  getSurveyTemplateById(id: number): Observable<SurveyTemplate> {
    const url = `${this.surveyTemplateUrl}/${id}`;
    return this.http.get<SurveyTemplate>(url);
  }

  deleteSurveyTemplateById(surveyId: number) {
    const url = `${this.surveyTemplateUrl}/${surveyId}`;
    return this.http.delete<SurveyTemplate>(url);
  }

  createSurvey() {
    const url = `${this.surveyTemplateUrl}`;
    return this.http.post(url, "")
  }

  createSection(surveyTemplateId: number | undefined, sectionName: string): Observable<Section> | null {
    console.log(`survey template id:${surveyTemplateId}`)
    if (surveyTemplateId) {
      console.log(`creating new section for template ${surveyTemplateId}`)
      const url = `${this.surveySectionUrl}`;
      let section = new Section();
      section.name = sectionName;
      section.questions = []
      return this.http.post<Section>(url, section)
    } else {
      return null
    }
  }

  updateSurveyTemplate(surveyTemplate: SurveyTemplate | null) {
    if (surveyTemplate) {
      const url = `${this.surveyTemplateUrl}`;
      return this.http.post(url, surveyTemplate)
    } else {
      return null
    }
  }
}
