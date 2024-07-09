// import Link from "next/link";wsx9

import { Metadata } from "next";
// import Upload from "@/components/Upload";
import FilePicker from "@/components/FilePicker/FilePicker";
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
    {/* <Upload/> */}
    <FilePicker className=""/>

    </>
  );
};

export default UploadPage;
