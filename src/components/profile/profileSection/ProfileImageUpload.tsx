"use client";

import React from "react";
import PHform from "../form/PHform";
import ImageUploader from "../form/ImageUploader";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileImageProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const imageSchema = z.object({
  avatar_url: z.array(z.any()).min(1, "At least one image is required"),
});

const ProfileImageUpload = ({ onNext, onPrev, defaultValues }: ProfileImageProps) => {
  return (
    <PHform
      onSubmit={onNext}
      resolver={zodResolver(imageSchema)}
      defaultValues={defaultValues}
    >
      <ImageUploader name="avatar_url" label="Upload Profile Image" size="medium" />

      <div className="flex justify-between mt-2">
        {onPrev && <Button variant="secondary" onClick={onPrev}>Previous</Button>}
        <Button type="submit">Next</Button>
      </div>
    </PHform>
  );
};

export default ProfileImageUpload;
