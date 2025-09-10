// this file just contains all of the raw data for the language course. We store it in a plain
// typescript file as opposed to yaml since this way we can get type inferrence when writing
// the metadata
//
// Each Puzzle has a corresponding .mdx file in content/[language]/[puzzleId].mdx
//
// Additionally, each id should be unique. 

import { LanguageCourse } from ".";


const typescript: LanguageCourse = {
  title: "Typescript",
  language: "typescript",
  dateOpen: new Date("2025-09-29"),
  description: "Learn typescript for web appications",
  puzzles: [
    {
      id: "day-1-hello-world",
      date: new Date("2025-09-29"),
      title: "Day One: Hello, Typescript!"
    },
    {
      id: "day-2-control-flow",
      date: new Date("2025-09-30"),
      title: "Day One: Hello, Typescript!"
    },

  ],
};


export const languageCourses = [
  typescript,
]
