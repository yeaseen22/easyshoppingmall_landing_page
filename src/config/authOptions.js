import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!email || !password) {
          return null;
        }
        try {
          if (email !== adminEmail) {
            return null;
          }
          if (password !== adminPassword) {
            return null;
          }
          return { email };
        } catch (error) {
          console.error("Error in NextAuth authorize:", error);
          return null;
        }
      },
    }),
  ],
};
