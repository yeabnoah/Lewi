import { expo } from "@better-auth/expo";
import prisma from "@lewi/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || "", "mybettertapp://", "exp://"],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      enabled: true,
    },
    // apple: {
    //   clientId: process.env.APPLE_CLIENT_ID as string,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    //   enabled: true,
    // },
  },
  plugins: [
    nextCookies(),
    expo(),
    // polar({
    //   client: polarClient,
    //   createCustomerOnSignUp: true,
    //   enableCustomerPortal: true,
    //   use: [
    //     checkout({
    //       products: [
    //         {
    //           productId: process.env.LWEI_PRO_PRODUCT_ID!,
    //           slug: "pro",
    //         },
    //       ],
    //       successUrl: process.env.POLAR_SUCCESS_URL,
    //       authenticatedUsersOnly: true,
    //     }),
    //     portal(),
    //   ],
    // }),
  ],
});
