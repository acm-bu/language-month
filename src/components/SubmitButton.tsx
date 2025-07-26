"use client";
import { useState } from "react";
import SubmitSolutionModal from "@/components/SubmitSolutionModal";
import type { Solution } from "@/server/db/schema";

interface SubmitButtonProps {
  title: string;
  language: string;
  puzzleId: string;
  existingSolution: Solution | null;
}

export default function SubmitButton({ title, language, puzzleId, existingSolution }: SubmitButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isUpdate = existingSolution !== null;

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        {isUpdate ? "Update Solution" : "Submit Solution"}
      </button>
      <SubmitSolutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        puzzleTitle={title}
        language={language}
        puzzleId={puzzleId}
        existingSolution={existingSolution}
        isUpdate={isUpdate}
      />
    </>
  )

}
