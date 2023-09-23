import Image from "next/image";
import React from "react";
import heroImage from "@/../public/undraw_mobile_ux_re_59hr.svg";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <div className="flex h-screen w-full items-center justify-around gap-5 bg-background">
      <div className="flex flex-col justify-evenly gap-2 rounded-2xl bg-purple-400 px-12 py-16 align-middle">
        <h1 className="text-5xl font-semibold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-6xl font-bold text-transparent">
            Task
          </span>
          Tracker
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
      <div className="relative">
        <svg
          className=""
          viewBox="0 0 200 200"
          width={500}
          height={500}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#37177D"
            d="M36.3,-61.8C49.2,-55.3,63.4,-50.1,68.7,-40C74,-29.9,70.4,-14.9,71.6,0.7C72.8,16.3,78.8,32.6,74.1,43.7C69.3,54.8,53.8,60.6,39.7,66.3C25.6,72,12.8,77.5,-1.4,80C-15.6,82.5,-31.3,81.8,-42.6,74.5C-54,67.3,-61.1,53.3,-63.7,39.8C-66.4,26.2,-64.7,13.1,-67.7,-1.8C-70.8,-16.7,-78.7,-33.3,-75.9,-46.8C-73.2,-60.2,-59.9,-70.5,-45.5,-76.1C-31.1,-81.8,-15.5,-82.9,-1.9,-79.5C11.7,-76.1,23.3,-68.4,36.3,-61.8Z"
            transform="translate(100 100)"
          />
        </svg>
        <Image
          src={heroImage}
          alt="hero image"
          width={350}
          height={350}
          className="absolute left-12 top-12"
        />
      </div>
    </div>
  );
};

export default Home;
