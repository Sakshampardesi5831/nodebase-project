import { prisma } from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    //fetching the video
    await step.sleep("wait-a-moment", "15s");

   //Transcibing
   await step.sleep("wait-a-moment", "15s")

   //Sending transcription to AI 
    await step.sleep("wait-a-moment", "15s")

    await step.run("create-workflow",()=>{
      return prisma.workflow.create({
        data: {
          name: "Test-workflow-from-inngest",
          status: "completed",
        }
      })
    })
    return { message: `Hello ${event.data.email}!` };
  },
);