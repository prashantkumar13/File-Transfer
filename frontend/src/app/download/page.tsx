// import Link from "next/link";wsx9
import React from 'react'

import { Metadata } from "next";
// import Upload from "@/components/Upload";
import Download from "@/components/Download/Download";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "File Manager | MegaShare",
  description: "A file sharing web app",
  // other metadata
};

const DownloadPage = () => {
  return (
    <>
      <Breadcrumb pageName="Download" description="All Your Files Are Here" key={"yoyo"} />
      {/* <Upload/> */}
      <Download />

    </>
  );
};

export default DownloadPage;
