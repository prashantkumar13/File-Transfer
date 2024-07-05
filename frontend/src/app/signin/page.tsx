import Link from "next/link";
import Signin from "@/components/Signin"

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In | MegaShare",
  description: "A file sharing web app",
  // other metadata
};

const SigninPage = () => {

  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
