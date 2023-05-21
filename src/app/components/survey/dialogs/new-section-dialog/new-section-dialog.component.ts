import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-section-dialog',
  templateUrl: './new-section-dialog.component.html',
  styleUrls: ['./new-section-dialog.component.scss']
})
export class NewSectionDialogComponent {
  sectionName = ""


  constructor(public dialogRef: MatDialogRef<NewSectionDialogComponent>) {
  }

  doAction() {
    this.dialogRef.close({event: 'new template', data: this.sectionName});
  }
}
