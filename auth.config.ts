import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    // GitHub,
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const validateFields = LoginSchema.safeParse(credentials);
  
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const existingUser = await getUserByEmail(email);

          if(!existingUser || !existingUser.password) return null;

          const passwordMatch = await bcrypt.compare(password, existingUser.password);

          if(passwordMatch) return existingUser;

          return null;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
} satisfies NextAuthConfig