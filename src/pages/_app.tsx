import { SessionProvider } from "next-auth/react";
import { TodoProvider } from "@/context/TodoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <TodoProvider>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <title>TaskTracker</title>
        </Head>
        <Component {...pageProps} />
      </TodoProvider>
    </SessionProvider>
  );
}
