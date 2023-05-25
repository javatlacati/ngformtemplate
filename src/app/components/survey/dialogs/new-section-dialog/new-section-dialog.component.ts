import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-section-dialog',
  templateUrl: './new-section-dialog.component.html',
  styleUrls: ['./new-section-dialog.component.scss']
})
export class NewSectionDialogComponent {
  sectionName = ""


  constructor(public dialogRef: MatDialogRef<NewSectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                verbo: string
              }
  ) {
  }

  doAction() {
    this.dialogRef.close({event: 'new template', data: this.sectionName});
  }
}
