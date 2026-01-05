"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
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

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: (data) => {
        toast.success(data.message);
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
      &nbsp;
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate({})}>
        Test AI
      </Button>
    </div>
  );
};

export default Page;
