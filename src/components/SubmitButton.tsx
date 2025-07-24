"use client";
import { useState } from "react";
import SubmitSolutionModal from "@/components/SubmitSolutionModal";


export default function SubmitButton({ title }: { title: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Submit Solution
      </button>
      <SubmitSolutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        puzzleTitle={title}
      />
    </>
  )

}
