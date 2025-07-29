"use server"

import { getUserAndSession } from "@/server/db/auth";
import { getDbFromEnv } from "@/server/db";
import { ActionResponse, clientErr } from ".";
import { getAllUserSolutions, insertSolution, isProgressed, updateSolution } from "@/server/db/solutions";
import type { SolutionContext } from "@/server/db/solutions";
import { redirect } from "next/navigation";


export async function postSolution({ explanation, code, language, puzzleId }: SolutionContext): ActionResponse<string> {
  const db = getDbFromEnv();
  const auth = await getUserAndSession(db);

  if (!auth) {
    return clientErr("Not logged in");
  }

  const solutions = await getAllUserSolutions(db, auth.user.id, language)
  const hasSolved = solutions.find(s => s.puzzleId === puzzleId) !== undefined;

  if (hasSolved) {
    return clientErr("Already solved this problem");
  }

  if (!(await isProgressed(db, auth.user.id, language, puzzleId, solutions))) {
    return clientErr("Not progressed enough to post solutions to this puzzle--complete prior puzzles first");
  }
  const result = await insertSolution(db, auth.user.id, { explanation, code, language, puzzleId });

  redirect(`/languages/${language}/${puzzleId}/solutions/${result.id}`);
}

export async function patchSolution({ explanation, code, language, puzzleId }: SolutionContext) {
  const db = getDbFromEnv();
  const auth = await getUserAndSession(db);

  if (!auth) {
    return clientErr("Not logged in");
  }

  const solutions = await getAllUserSolutions(db, auth.user.id, language)
  const hasSolved = solutions.find(s => s.puzzleId === puzzleId) !== undefined;

  if (!hasSolved) {
    return clientErr("Have not solved this problem yet");
  }

  const result = await updateSolution(db, auth.user.id, { explanation, code, language, puzzleId });

  redirect(`/languages/${language}/${puzzleId}/solutions/${result.id}`);
}

