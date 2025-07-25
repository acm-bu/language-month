import { and, eq } from "drizzle-orm";
import { Database } from ".";
import { ShortenedSolution, Solution, solutionsTable } from "./schema";
import { findAllCourses, findCourse } from "../languages";
import { notFound } from "next/navigation";
import { randomUUIDv7 } from "bun";

export interface SolutionContext {
  explanation: string;
  code: string;
  language: string;
  puzzleId: string;
}

export async function hasSolved(db: Database, userId: string, language: string, puzzleId: string, prefetchedSolutions?: ShortenedSolution[]): Promise<boolean> {
  // if we already have fetched the user's solutions, we can just pass it in to avoid double fetching
  const solutions = prefetchedSolutions === undefined
    ? await getAllUserSolutions(db, userId, language)
    : prefetchedSolutions;

  const course = findCourse(language);

  // if we dont' have the course then we go to notFound rather than redirect
  // since it means the user is somewhere they shouldn't be
  if (!course) {
    notFound();
  }

  const neededProgressionIndex = course.puzzles.findIndex(p => p.id === puzzleId);

  // this is another case where we are specifying a puzzleId that doesn't
  // exist, so we do the same thing as if there is no course
  if (neededProgressionIndex === -1) {
    notFound();
  }

  let currentProgressionIndex = -1;
  // it doesn't really matter that this is O(n^2) since it's at most like 16
  // puzzles (256 checks is nothing) and optimizing it is not worth the effort
  for (const solution of solutions) {
    const i = course.puzzles.findIndex(p => p.id === solution.puzzleId)
    if (i > currentProgressionIndex) {
      currentProgressionIndex = i;
    }
  }

  return (currentProgressionIndex >= neededProgressionIndex)
}

// this is the same as hasSolved except checks that a user is able to attempt the puzzle. 
export async function isProgressed(db: Database, userId: string, language: string, puzzleId: string, prefetchedSolutions?: ShortenedSolution[]) {
  // if we already have fetched the user's solutions, we can just pass it in to avoid double fetching
  const solutions = prefetchedSolutions === undefined
    ? await getAllUserSolutions(db, userId, language)
    : prefetchedSolutions;

  const course = findCourse(language);

  if (!course) {
    notFound();
  }

  const neededProgressionIndex = course.puzzles.findIndex(p => p.id === puzzleId);

  if (neededProgressionIndex === -1) {
    notFound();
  }

  let currentProgressionIndex = -1;
  for (const solution of solutions) {
    const i = course.puzzles.findIndex(p => p.id === solution.puzzleId)
    if (i > currentProgressionIndex) {
      currentProgressionIndex = i;
    }
  }

  return (currentProgressionIndex >= neededProgressionIndex - 1)
}

export async function getAllUserSolutions(db: Database, userId: string, language: string): Promise<ShortenedSolution[]> {
  const solutions = await db
    .select({
      id: solutionsTable.id,
      puzzleId: solutionsTable.puzzleId,
      language: solutionsTable.language,
      userId: solutionsTable.userId,
      timestamp: solutionsTable.timestamp,
    })
    .from(solutionsTable)
    .where(and(
      eq(solutionsTable.userId, userId),
      eq(solutionsTable.language, language),
    ))

  return solutions;
}

export async function getUserSolution(db: Database, userId: string, language: string, puzzleId: string): Promise<Solution | null> {
  const solutions = await db
    .select()
    .from(solutionsTable)
    .where(and(
      eq(solutionsTable.puzzleId, puzzleId),
      eq(solutionsTable.language, language),
      eq(solutionsTable.userId, userId),
    ))
    .limit(1)

  return solutions.length > 0 ? solutions[0] : null
}

export async function getLanguageProgress(db: Database, userId: string, language: string): Promise<{ completed: number, total: number }> {
  const course = findCourse(language);
  const solutions = await getAllUserSolutions(db, userId, language);

  if (!course) {
    notFound();
  }

  return {
    total: course.puzzles.length,
    completed: solutions.length,
  };
}


// maps the language to the 
export async function getAllLanguagesProgress(db: Database, userId: string): Promise<Record<string, { completed: number, total: number }>> {
  const courses = findAllCourses()
  const solutions = await db
    .select({
      id: solutionsTable.id,
      puzzleId: solutionsTable.puzzleId,
      language: solutionsTable.language,
      userId: solutionsTable.userId,
      timestamp: solutionsTable.timestamp,
    })
    .from(solutionsTable)
    .where(and(
      eq(solutionsTable.userId, userId),
    ))

  const mappedSolutions: Record<string, number> = {};

  for (const s of solutions) {
    if (mappedSolutions[s.language]) {
      mappedSolutions[s.language] += 1;
    } else {
      mappedSolutions[s.language] = 1;
    }
  }

  const final: Record<string, { completed: number, total: number }> = {};
  for (const course of courses) {
    final[course.language] = {
      completed: mappedSolutions[course.language] ?? 0,
      total: course.puzzles.length,
    }
  }

  return final;
}

export async function insertSolution(db: Database, userId: string, ctx: SolutionContext): Promise<Solution> {
  const id = randomUUIDv7();
  const result = await db
    .insert(solutionsTable)
    .values({
      id,
      userId,
      ...ctx,
    })
    .returning();

  return result[0]!;
}

export async function updateSolution(db: Database, userId: string, ctx: SolutionContext): Promise<Solution> {
  const result = await db
    .update(solutionsTable)
    .set({
      explanation: ctx.explanation,
      code: ctx.code,
    })
    .where(and(
      eq(solutionsTable.userId, userId),
      eq(solutionsTable.puzzleId, ctx.puzzleId),
      eq(solutionsTable.language, ctx.language),
    ))
    .returning();

  return result[0]!;
}
