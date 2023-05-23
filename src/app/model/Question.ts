import {QuestionType} from "./QuestionType";

export class Question {
  questionId: number = 0
  statement: string = "";
  required: boolean = false;
  questionType: QuestionType = QuestionType.OPEN;
}
