import React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { caller } from "@/trpc/server";
const Page = async () => {
  const loggedUser = await caller.getUsers({ text: "hello ji" });
  return (
    <div>
      Protected server component {JSON.stringify(loggedUser)}
      {/* {loggedUser && (
        <Button onClick={() => authClient.signOut()}>Logout</Button>
      )} */}
    </div>
  );
};

export default Page;
