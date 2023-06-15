import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-template-share-bottom-sheet',
  templateUrl: './template-share-bottom-sheet.component.html',
  styleUrls: ['./template-share-bottom-sheet.component.scss']
})
export class TemplateShareBottomSheetComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<TemplateShareBottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
    uuid: string
  }) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    let correo = window.prompt("correo al que desea compartir la encuesta")
    window.location.href = `mailto:${correo}?Subject=Encuesta&body=liga:  %0D${environment.surveyFrontendURL}/survey/${this.data.uuid}/`
  }

  protected readonly environment = environment;
}
