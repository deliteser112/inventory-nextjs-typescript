import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

interface ImageUploaderProps {
  onImageSelect: (image: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const result = reader.result.toString();
          setPreviewUrl(result); 
          onImageSelect(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        border: "1px dashed #39DB7D",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box onClick={() => fileInputRef.current?.click()}>
        {previewUrl ? (
          // Display image preview if an image is uploaded
          <Box
            component="img"
            src={previewUrl}
            alt="Image Preview"
            sx={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
        ) : (
          // Display placeholder text when no image is uploaded
          <>
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              No image uploaded yet
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#39DB7D", fontWeight: "bold" }}
            >
              Select Image
            </Typography>
            <Typography variant="caption" sx={{ color: "#FFFFFF" }}>
              20 mb Max
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ImageUploader;
