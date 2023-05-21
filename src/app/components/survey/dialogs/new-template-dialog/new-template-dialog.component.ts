import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-template-dialog',
  templateUrl: './new-template-dialog.component.html',
  styleUrls: ['./new-template-dialog.component.scss']
})
export class NewTemplateDialogComponent {
  templateName = ""


  constructor(public dialogRef: MatDialogRef<NewTemplateDialogComponent>) {
  }

  doAction() {
    this.dialogRef.close({event: 'new template', data: this.templateName});
  }
}
