import RegisterForm from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";
import React, { Fragment } from "react";

const Page = async () => {
  await requireUnAuth();
  return (
    <Fragment>
      <RegisterForm/>
    </Fragment>
  );
};

export default Page;
