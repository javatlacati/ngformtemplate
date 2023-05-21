import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTemplateDialogComponent } from './new-template-dialog.component';

describe('NewTemplateDialogComponent', () => {
  let component: NewTemplateDialogComponent;
  let fixture: ComponentFixture<NewTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTemplateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
