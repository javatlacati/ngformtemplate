import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NewSectionDialogComponent} from "../new-section-dialog/new-section-dialog.component";
import {Question} from "../../../../model/Question";
import {MultipleOptionQuestion} from "../../../../model/MultipleOptionQuestion";

@Component({
  selector: 'app-new-question-dialog',
  templateUrl: './new-question-dialog.component.html',
  styleUrls: ['./new-question-dialog.component.scss']
})
export class NewQuestionDialogComponent {
  tiposPregunta = ["OPEN", "DATE", "MULTIPLE_OPTION"];
  statement: string = "";
  required: boolean = false;
  tipoPreguntaSeleccionada: string = 'OPEN';

  constructor(public dialogRef: MatDialogRef<NewSectionDialogComponent>) {
  }

  doAction() {
    let question = this.tipoPreguntaSeleccionada === 'MULTIPLE_OPTION' ? new MultipleOptionQuestion() : new Question();
    question.statement = this.statement;
    question.required = this.required;
    question.type = this.tipoPreguntaSeleccionada;
    if (this.tipoPreguntaSeleccionada === 'MULTIPLE_OPTION') {
      (question as MultipleOptionQuestion).answerOptions = [];
    }
    this.dialogRef.close({event: 'new template', data: {question: question}});
  }
}
