import { languageCourses } from "./data";

export interface LanguageCourse {
  language: string;
  dateOpen: Date;
  title: string;
  description: string;
  puzzles: Puzzle[];
}

export interface Puzzle {
  id: string;
  title: string;
  date: Date;
}



export function findPuzzleInCourse(course: LanguageCourse, id: string): Puzzle | null {
  return course.puzzles.find((p) => p.id === id) ?? null;
} 

export function findCourse(language: string): LanguageCourse | null {
  return languageCourses.find((l) => l.language === language) ?? null;
}

export function findAllCourses() {
  return languageCourses;
}

export function findCourseAndPuzzle(language: string, id: string): { puzzle: Puzzle, course: LanguageCourse } | null {
  const course = findCourse(language)

  if (!course) {
    return null;
  }

  const puzzle = findPuzzleInCourse(course, id);

  if (!puzzle) {
    return null;
  }

  return { course, puzzle };
}


export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getStringMonth(date: Date): string {
  return months[date.getUTCMonth()];
}

export function getStringWeekday(date: Date): string {
  return dayNames[date.getUTCDay()];
}
