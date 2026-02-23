export enum Difficulty {
  BEGINNER = "Junior",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Senior"
}

export enum GrammarCategory {
  NON_FINITE = "Non-finite Verbs",
  RELATIVE_CLAUSE = "Relative Clauses",
  ADVERBIAL_CLAUSE = "Adverbial Clauses",
  ABSOLUTE_CONSTRUCTION = "Absolute Construction",
  CONJUNCTION = "Conjunctions",
  SUBJUNCTIVE = "Subjunctive Mood"
}

export interface Question {
  id: string;
  sentenceParts: string[]; // e.g., ["", " tired, she still finished the report."]
  correctAnswers: string[];
  options: string[][]; // Array of options for each blank
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
    reviewLink?: string;
  };
  difficulty: Difficulty;
  category: GrammarCategory;
}

export interface UserAnswer {
  questionId: string;
  answers: string[];
  isSubmitted: boolean;
}
