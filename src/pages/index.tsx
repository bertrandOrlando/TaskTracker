import Image from "next/image";
import React from "react";
import heroImage from "@/../public/undraw_mobile_ux_re_59hr.svg";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div className="flex h-screen w-full items-center justify-around gap-5 bg-background">
      <div className="flex flex-col justify-evenly gap-2 rounded-2xl bg-purple-400 px-12 py-16 align-middle">
        <h1 className="text-5xl font-semibold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-6xl font-bold text-transparent">
            To-Do {""}
          </span>
          Today
        </h1>
        <h2 className="mb-10 text-xl font-bold text-primary">
          Your To-Do List Wizard
        </h2>
        <button
          className="group relative h-12 w-48 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white hover:scale-105"
          onClick={
            status === "authenticated"
              ? () => {
                  router.push("/my-todos");
                }
              : () =>
                  signIn(undefined, {
                    callbackUrl: "/my-todos",
                  })
          }
        >
          {status === "authenticated"
            ? "See My To-Do List"
            : "Get Started with Us"}

          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </div>
      <Image src={heroImage} alt="hero image" width={400} height={400} />
    </div>
  );
};

export default Home;
