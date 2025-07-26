"use client";

import { useState } from "react";

interface SubmitSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleTitle: string;
}

export default function SubmitSolutionModal({ isOpen, onClose, puzzleTitle }: SubmitSolutionModalProps) {
  const [solution, setSolution] = useState("");

  const handleSubmit = () => {
    // Handle solution submission here
    console.log("Submitting solution:", solution);
    setSolution("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <h3 className="font-bold text-lg mb-4">Submit Solution - {puzzleTitle}</h3>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Solution</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-64 font-mono text-sm"
            placeholder="Paste your code solution here..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={!solution.trim()}
          >
            Submit Solution
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
