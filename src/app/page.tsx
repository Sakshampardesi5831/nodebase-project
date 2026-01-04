"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
const Page = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.getWorkflows.queryOptions({ text: "hello ji" })
  );

  const create = useMutation(
    trpc.createWorkFlow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.getWorkflows.queryOptions({ text: "hello ji" })
        );
      },
    })
  );
  return (
    <div>
      Protected server component {JSON.stringify(data)}
      {/* {loggedUser && (
        
      )} */}
      <Button
        disabled={create.isPending}
        onClick={() => create.mutate({ text: "hello ji" })}
      >
        Create Workflow
      </Button>
    </div>
  );
};

export default Page;
