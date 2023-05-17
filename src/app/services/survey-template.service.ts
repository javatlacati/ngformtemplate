import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SurveyTemplate} from "../model/SurveyTemplate";

@Injectable({
  providedIn: 'root'
})
export class SurveyTemplateService {

  private readonly surveyTemplateUrl = 'http://localhost:8081/template';

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
}
