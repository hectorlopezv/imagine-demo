import Image from "next/image";
import React from "react";
import AuthForm from "./components/AuthForm";

type Props = {};

export default function Home({}: Props) {
  return (
    <div
      className="flex min-h-full flex-col justify-center  items-center
    py-12 sm:px-6 lg:px-8 bg-gray-100"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in into your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
