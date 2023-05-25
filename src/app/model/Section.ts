import {Question} from "./Question";

export class Section {
  sectionId: number | null = null
  name: string = ""
  questions: Question[] = []
}
