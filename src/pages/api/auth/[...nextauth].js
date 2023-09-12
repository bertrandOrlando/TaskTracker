import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      idToken: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      idToken: true,
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
    // Credential({})
  ],
};

export default NextAuth(authOptions);
