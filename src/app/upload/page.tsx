import Link from "next/link";

import { Metadata } from "next";
import Upload from "@/components/Upload";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "Upload Your File | MegaShare",
  description: "A file sharing web app",
  // other metadata
};

const UploadPage = () => {
  return (
    <>
    <Breadcrumb pageName="Upload" description="Upload Your Files Here" key={"yoyo"}/>
    <Upload/>

    </>
  );
};

export default UploadPage;
