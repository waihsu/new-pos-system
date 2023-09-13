import { Box } from "@mui/material";
import { Heading } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidFilePlus } from "react-icons/bi";

interface Props {
  selectedFile: (acceptedFiles: File[]) => void;
}

export default function FileDropZone({ selectedFile }: Props) {
  const [image, setImage] = useState("");
  const onDrop = (files: File[]) => {
    selectedFile(files);
    const file = files[0];
    const reader = new FileReader();
    (reader.onload = (evt) => {
      setImage(evt.target?.result as string);
    }),
      reader.readAsDataURL(file),
      [selectedFile];
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          borderRadius: 4,
          border: "3px dotted lightgray",
          textAlign: "center",
          cursor: "pointer",
          py: 2,
          my: 2,
        }}>
        <input {...getInputProps()} />
        <Box sx={{ fontSize: 40 }}>
          <Heading size={"3"}> image here</Heading>
          <BiSolidFilePlus />
        </Box>
      </Box>
      {image ? (
        <Box sx={{ position: "relative", width: "fit-content" }}>
          <Box
            onClick={() => {
              setImage("");
              selectedFile([]);
            }}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              zIndex: 10,
              color: "red",
            }}>
            <AiFillCloseCircle />
          </Box>
          <Image src={image} alt="product" width={100} height={100} />
        </Box>
      ) : null}
    </Box>
  );
}
