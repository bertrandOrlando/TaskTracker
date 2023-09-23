import NextAuth, { Account, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import sql from "../../../../postgresql";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  debugger: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      idToken: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        //@ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: account?.provider,
      };

      await sql`
          insert into users ${sql(userData, "id", "name", "email", "provider")}
          ON CONFLICT (id) DO NOTHING

          returning *
        `;

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
