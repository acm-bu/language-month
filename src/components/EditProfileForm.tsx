"use client";

import { editProfile } from "@/actions/profile";
import type { EditableProfile, PrivateUser } from "@/server/db/schema";
import { useState } from "react";

interface EditProfileFormProps {
  user: PrivateUser;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [formData, setFormData] = useState<EditableProfile>({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await editProfile(formData);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMessage({ 
        text: error instanceof Error ? error.message : "Failed to update profile",
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio ?? ""}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Tell us about yourself..."
          />
        </div>

        {message && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
