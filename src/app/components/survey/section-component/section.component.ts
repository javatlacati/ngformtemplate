import { Component } from '@angular/core';

@Component({
  selector: 'app-section-component',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  sectionName: string = "General info";

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;


  // constructor(sectionName: string) {
  //   this.sectionName = sectionName;
  // }
}
