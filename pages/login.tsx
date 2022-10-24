import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffectOnce } from "usehooks-ts";
import { LoginForm } from "../components/login";
import { supabase } from "../utils";

const Login: NextPage = () => {
  const router = useRouter();

  useEffectOnce(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session !== null) {
        await router.push("/dashboard");
        return null;
      }
    };
    checkLogin().then((r) => console.log(r));
  });
  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-black to-pink-500">
      {/*<Title color="light" />*/}
      <div className="mt-24 flex flex-col items-center justify-center">
        <LoginForm />
      </div>
      <Link href={"/register"}>
        <button className="absolute right-0 bottom-10 z-30 rounded-l-lg bg-black p-3 font-semibold text-white">
          Don&apos;t have an account? Register
        </button>
      </Link>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={"index h absolute bottom-0 z-10 w-full"}
      >
        <path
          fill="#9333EA"
          fillOpacity="0.5"
          d="M0,160L48,170.7C96,181,192,203,288,181.3C384,160,480,96,576,101.3C672,107,768,181,864,181.3C960,181,1056,107,1152,90.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={"index absolute bottom-0 z-10 w-full"}
      >
        <path
          fill="#9333EA"
          fillOpacity="0.6"
          d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,122.7C672,171,768,245,864,245.3C960,245,1056,171,1152,144C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Login;
