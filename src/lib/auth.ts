import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { polarClient } from "./polar";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "dee9b9b4-2ac9-4938-a53e-5d6d3df999df",
              slug: "Nodebase-dev", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Nodebase-dev
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL!,
          authenticatedUsersOnly: true,
        }),
        portal({}),
      ],
    }),
  ],
});
