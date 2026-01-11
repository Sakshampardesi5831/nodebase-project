import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.input(z.object({})).mutation(async ({ ctx }) => {
    await inngest.send({
      name: "execute/ai",
    });
    return { success: true, message: "Job Queued" };
  }),
  getWorkflows: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async ({ ctx }) => {
      //console.log("user detail===>",ctx.auth.user.email)
      return (await prisma.workflow.findMany()) || [];
    }),
  createWorkFlow: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: "saksham@gmail.com",
        },
      });
      return { success: true, message: "Job Queued" };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
