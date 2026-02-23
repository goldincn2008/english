import { Question, Difficulty, GrammarCategory } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: '1',
    sentenceParts: ['', ' tired, she still finished the report.'],
    correctAnswers: ['Although'],
    options: [['Although', 'Because', 'Unless', 'Despite']],
    explanation: {
      rule: "Although is used to introduce a subordinate clause that contains a statement which contrasts with the main clause.",
      example: "Although it was raining, we went out.",
      commonMistake: "Don't use 'but' in the same sentence with 'although'. Incorrect: Although it was raining, but we went out.",
      reviewLink: "https://learnenglish.britishcouncil.org/grammar/intermediate-to-upper-intermediate/conjunctions"
    },
    difficulty: Difficulty.BEGINNER,
    category: GrammarCategory.ADVERBIAL_CLAUSE
  },
  {
    id: '2',
    sentenceParts: ['The girl ', ' next to me is my sister.'],
    correctAnswers: ['sitting'],
    options: [['sit', 'sitting', 'sat', 'to sit']],
    explanation: {
      rule: "Present participle (-doing) is used as an adjective to describe a noun performing an action.",
      example: "The man standing there is my uncle.",
      commonMistake: "Using the base form 'sit' or past participle 'sat' when the action is active and ongoing.",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.NON_FINITE
  },
  {
    id: '3',
    sentenceParts: ['This is the house ', ' Lu Xun once lived.'],
    correctAnswers: ['where'],
    options: [['which', 'that', 'where', 'who']],
    explanation: {
      rule: "'Where' is a relative adverb used to refer to a place in a relative clause.",
      example: "The park where we played is closed.",
      commonMistake: "Using 'which' without a preposition. Correct: 'the house in which' or 'the house where'.",
    },
    difficulty: Difficulty.BEGINNER,
    category: GrammarCategory.RELATIVE_CLAUSE
  },
  {
    id: '4',
    sentenceParts: ['', ' the homework, the boy went out to play.'],
    correctAnswers: ['Having finished'],
    options: [['Finish', 'Finished', 'Having finished', 'To finish']],
    explanation: {
      rule: "The perfect participle (Having + done) is used to emphasize that one action happened before another.",
      example: "Having seen the movie, I didn't want to go again.",
      commonMistake: "Using 'Finished' which might imply the boy was finished by someone else (passive).",
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarCategory.NON_FINITE
  },
  {
    id: '5',
    sentenceParts: ['Weather ', ', we will go for a picnic tomorrow.'],
    correctAnswers: ['permitting'],
    options: [['permits', 'permitted', 'permitting', 'to permit']],
    explanation: {
      rule: "This is an absolute construction. 'Weather permitting' acts as an adverbial phrase.",
      example: "Time permitting, I'll visit you.",
      commonMistake: "Using 'permits' as if it were a main verb in a separate sentence.",
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarCategory.ABSOLUTE_CONSTRUCTION
  },
  {
    id: '6',
    sentenceParts: ['I don\'t know ', ' he will come or not.'],
    correctAnswers: ['whether'],
    options: [['if', 'whether', 'that', 'when']],
    explanation: {
      rule: "Use 'whether' when followed by 'or not' directly or at the end of the clause.",
      example: "I'm not sure whether it will rain or not.",
      commonMistake: "Using 'if' with 'or not' is less formal and sometimes considered incorrect in strict grammar.",
    },
    difficulty: Difficulty.INTERMEDIATE,
    category: GrammarCategory.CONJUNCTION
  },
  {
    id: '7',
    sentenceParts: ['The book ', ' I bought yesterday is very interesting.'],
    correctAnswers: ['which'],
    options: [['who', 'whose', 'which', 'where']],
    explanation: {
      rule: "'Which' or 'that' is used to refer to things in a relative clause.",
      example: "The car which I drive is old.",
      commonMistake: "Using 'who' for inanimate objects.",
    },
    difficulty: Difficulty.BEGINNER,
    category: GrammarCategory.RELATIVE_CLAUSE
  },
  {
    id: '8',
    sentenceParts: ['It is important that he ', ' there on time.'],
    correctAnswers: ['be'],
    options: [['is', 'be', 'was', 'been']],
    explanation: {
      rule: "The subjunctive mood is used after 'It is important/necessary/essential that...'. The verb should be in base form (should + do, with 'should' often omitted).",
      example: "It is necessary that she study hard.",
      commonMistake: "Using 'is' or 'was' based on the subject or tense of the main clause.",
    },
    difficulty: Difficulty.ADVANCED,
    category: GrammarCategory.SUBJUNCTIVE
  }
];
