import React from 'react'
import { Metadata } from "next";
// import Upload from "@/components/Upload";
import FileManager from "@/components/FileManager/FileManager";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "File Manager | MegaShare",
  description: "A file sharing web app",
  // other metadata
};

const UploadPage = () => {
  return (
    <>
      <Breadcrumb pageName="My Files" description="All Your Files Are Here" key={"yoyo"} />
      {/* <Upload/> */}
      <FileManager />

    </>
  );
};

export default UploadPage;
