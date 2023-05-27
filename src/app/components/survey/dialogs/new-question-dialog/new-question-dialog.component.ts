import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NewSectionDialogComponent} from "../new-section-dialog/new-section-dialog.component";

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
  options: string[] = [];


  constructor(public dialogRef: MatDialogRef<NewSectionDialogComponent>) {
  }

  doAction() {
    this.dialogRef.close({event: 'new template', data: {}});
  }
}
