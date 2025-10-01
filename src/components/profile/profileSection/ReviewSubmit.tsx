"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  User,
  Briefcase,
  Mail,
  FileText,
  CheckCircle2,
  Edit,
  MapPin,
  Phone,
  Globe,
  Clock,
  Building2,
  Award,
  Shield,
  Image,
} from "lucide-react";

type ReviewSubmitProps = {
  formData: any;
  onPrev: () => void;
  onSubmitAll: () => void;
};

const ReviewSubmit = ({ formData, onPrev, onSubmitAll }: ReviewSubmitProps) => {
  const InfoCard = ({ icon: Icon, title, children }: any) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 flex items-center justify-center">
          <Icon className="w-5 h-5 text-pink-600 dark:text-pink-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const InfoRow = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-start gap-3 py-2">
      {Icon && <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-900 dark:text-gray-100 break-words">
          {value || <span className="text-gray-400">Not provided</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 mb-4">
          <CheckCircle2 className="w-8 h-8 text-pink-600 dark:text-pink-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Review Your Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Please review all details before submitting
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <InfoCard icon={User} title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Full Name" value={formData.full_name} icon={User} />
            <InfoRow label="Username" value={formData.username} icon={User} />
            <InfoRow label="Phone Number" value={formData.phone} icon={Phone} />
            <InfoRow label="Location" value={formData.location} icon={MapPin} />
            <InfoRow label="Timezone" value={formData.timezone} icon={Clock} />
            <InfoRow label="Language" value={formData.language} icon={Globe} />
          </div>
        </InfoCard>

        <InfoCard icon={Briefcase} title="Professional Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow
              label="Job Title"
              value={formData.job_title}
              icon={Briefcase}
            />
            <InfoRow
              label="Company"
              value={formData.company}
              icon={Building2}
            />
            <InfoRow label="Industry" value={formData.industry} icon={Award} />
            <InfoRow
              label="Experience Level"
              value={formData.experience_level}
              icon={Award}
            />
            <InfoRow
              label="Years of Experience"
              value={
                formData.years_of_experience
                  ? `${formData.years_of_experience} years`
                  : null
              }
            />
            <InfoRow label="Skills" value={formData.skills} />
          </div>
        </InfoCard>

        <InfoCard icon={Shield} title="Account Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Email Address" value={formData.email} icon={Mail} />
            <InfoRow label="Password" value="••••••••" icon={Shield} />
          </div>
        </InfoCard>

        <InfoCard icon={Image} title="Profile Image">
          {formData.avatar_url && formData.avatar_url.length > 0 ? (
            <div className="flex gap-4 flex-wrap">
              {formData.avatar_url.map((file: any, idx: number) => (
                <div key={idx} className="relative group">
                  <img
                    src={
                      file instanceof File ? URL.createObjectURL(file) : file
                    }
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <Image className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No profile image uploaded
              </p>
            </div>
          )}
        </InfoCard>

        <InfoCard icon={FileText} title="Resume & Portfolio">
          {formData.resume_url && formData.resume_url.length > 0 ? (
            <div className="space-y-2">
              {formData.resume_url.map((file: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {file.name || file}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF Document
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <FileText className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No documents uploaded
              </p>
            </div>
          )}
        </InfoCard>

        <InfoCard icon={Clock} title="Availability & Preferences">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50">
              <CheckCircle2
                className={`w-6 h-6 ${
                  formData.is_available_for_mock_interviews
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-400"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Available for Mock Interviews
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {formData.is_available_for_mock_interviews
                    ? "You are available for conducting mock interviews"
                    : "Currently not available"}
                </p>
              </div>
            </div>

            {formData.description && (
              
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 w-full">
                  Additional Description
                </p>
                
                <div
                    className="w-[20rem] md:w-[40rem] xl:w-full
    p-4 rounded-lg 
    bg-gray-50 dark:bg-gray-800/50 
    text-sm text-gray-700 dark:text-gray-300 
    prose prose-sm dark:prose-invert 
    break-words whitespace-pre-wra
  "
  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
              
            )}
          </div>
        </InfoCard>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex-1 px-6 py-3 rounded-lg font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Information
          </Button>

          <Button
            onClick={onSubmitAll}
            className="flex-1 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Submit Application
          </Button>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-8 h-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500"></div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
