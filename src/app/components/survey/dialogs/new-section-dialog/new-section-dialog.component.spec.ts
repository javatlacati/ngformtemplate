import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSectionDialogComponent } from './new-section-dialog.component';

describe('NewTemplateDialogComponent', () => {
  let component: NewSectionDialogComponent;
  let fixture: ComponentFixture<NewSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
