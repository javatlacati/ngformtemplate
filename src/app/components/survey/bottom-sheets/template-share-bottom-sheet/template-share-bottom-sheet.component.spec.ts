import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateShareBottomSheetComponent } from './template-share-bottom-sheet.component';

describe('TemplateShareBottomSheetComponent', () => {
  let component: TemplateShareBottomSheetComponent;
  let fixture: ComponentFixture<TemplateShareBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateShareBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateShareBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
