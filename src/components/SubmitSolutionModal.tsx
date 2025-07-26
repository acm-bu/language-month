"use client";

import { useState } from "react";
import { postSolution, patchSolution } from "@/actions/solutions";
import type { Solution } from "@/server/db/schema";

interface SubmitSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleTitle: string;
  language: string;
  puzzleId: string;
  existingSolution: Solution | null;
  isUpdate: boolean;
}

export default function SubmitSolutionModal({ isOpen, onClose, puzzleTitle, language, puzzleId, existingSolution, isUpdate }: SubmitSolutionModalProps) {
  const [code, setCode] = useState(existingSolution?.code || "");
  const [explanation, setExplanation] = useState(existingSolution?.explanation || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim() || !explanation.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = isUpdate 
        ? await patchSolution({ explanation, code, language, puzzleId })
        : await postSolution({ explanation, code, language, puzzleId });
      
      if (result.result === "OK") {
        setCode("");
        setExplanation("");
        onClose();
        // Refresh the page to show updated state
        window.location.reload();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <h3 className="font-bold text-lg mb-4">{isUpdate ? "Update" : "Submit"} Solution - {puzzleTitle}</h3>
        
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Explanation</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-32"
            placeholder="Explain your approach and solution..."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Code</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-64 font-mono text-sm"
            placeholder="Paste your code solution here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={!code.trim() || !explanation.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (isUpdate ? "Update Solution" : "Submit Solution")}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
