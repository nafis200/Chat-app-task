import React, { useState } from "react";

const PdfUpload = () => {
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handlePdfChange} />

      {pdfPreview && (
        <iframe
          src={pdfPreview}
          width="600"
          height="500"
          title="PDF Preview"
        ></iframe>
      )}
    </div>
  );
};

export default PdfUpload;
