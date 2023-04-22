import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTemplateDetailsComponent } from './survey-template-details.component';

describe('SurveyTemplateDetailsComponent', () => {
  let component: SurveyTemplateDetailsComponent;
  let fixture: ComponentFixture<SurveyTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyTemplateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
