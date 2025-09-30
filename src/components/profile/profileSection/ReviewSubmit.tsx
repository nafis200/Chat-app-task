"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type ReviewSubmitProps = {
  formData: any;
  onPrev: () => void;
  onSubmitAll: () => void;
};

const ReviewSubmit = ({ formData, onPrev, onSubmitAll }: ReviewSubmitProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Overview Information</h2>

      {/* Personal Information */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>User ID:</strong> {formData.user_id || "-"}</div>
          <div><strong>Username:</strong> {formData.username || "-"}</div>
          <div><strong>Full Name:</strong> {formData.full_name || "-"}</div>
          <div><strong>Phone:</strong> {formData.phone || "-"}</div>
          <div><strong>Location:</strong> {formData.location || "-"}</div>
          <div><strong>Timezone:</strong> {formData.timezone || "-"}</div>
          <div><strong>Language:</strong> {formData.language || "-"}</div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Professional Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Job Title:</strong> {formData.job_title || "-"}</div>
          <div><strong>Company:</strong> {formData.company || "-"}</div>
          <div><strong>Industry:</strong> {formData.industry || "-"}</div>
          <div><strong>Experience Level:</strong> {formData.experience_level || "-"}</div>
          <div><strong>Years of Experience:</strong> {formData.years_of_experience || "-"}</div>
          <div><strong>Skills:</strong> {formData.skills || "-"}</div>
        </div>
      </div>

      {/* Security & Account */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Account Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Email:</strong> {formData.email || "-"}</div>
          <div><strong>Password:</strong> *******</div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Profile Image</h3>
        {formData.avatar_url && formData.avatar_url.length > 0 ? (
          <div className="flex gap-4">
            {formData.avatar_url.map((file: any, idx: number) => (
              <img
                key={idx}
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border"
              />
            ))}
          </div>
        ) : (
          <p>No profile image uploaded</p>
        )}
      </div>

      {/* Resume / Portfolio */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Resume / Portfolio</h3>
        {formData.resume_url && formData.resume_url.length > 0 ? (
          <ul className="list-disc list-inside">
            {formData.resume_url.map((file: any, idx: number) => (
              <li key={idx}>{file.name || file}</li>
            ))}
          </ul>
        ) : (
          <p>No document uploaded</p>
        )}
      </div>

      {/* Availability & Preferences */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Availability & Preferences</h3>
        <p>
          <strong>Available for Mock Interviews:</strong>{" "}
          {formData.is_available_for_mock_interviews ? "Yes" : "No"}
        </p>
        {formData.description && (
          <div className="mt-2">
            <strong>Description:</strong>
            <div
              className="p-2 border rounded bg-gray-50"
              dangerouslySetInnerHTML={{ __html: formData.description }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6">
        <Button className="flex-1" onClick={onSubmitAll}>
          Submit All
        </Button>
        <Button variant="secondary" className="flex-1" onClick={onPrev}>
          Previous
        </Button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
