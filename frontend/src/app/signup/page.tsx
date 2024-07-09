import Link from "next/link";
import Signup from "@/components/Signup"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp | MegaShare",
  description: "A file sharing web app",
  // other metadata
};

const SignupPage = () => {
  return (
    <><Signup />
    </>
  );
};

export default SignupPage;
