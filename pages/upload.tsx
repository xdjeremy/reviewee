import React, { useState } from "react";
import { NextPage } from "next";

// const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");

const Upload: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    // console.log(pdf(selectedFile));
  };
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
};

export default Upload;
