"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Input from "./Input";
type Props = {};
type Variant = "LOGIN" | "REGISTER";

export default function AuthForm({}: Props) {
  const [variant, setVariant] = useState<Variant>("REGISTER");
  const [isLoading, setisLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      admin: false,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);
    console.log("data login", data);
    //sign user
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Account created");
          signIn("credentials", data);
        })
        .catch(() => {
          toast.error("something went wrong");
        })
        .finally(() => {
          setisLoading(false);
        });
    }

    //next auth signin
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("something went wrong");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Welcome back");
          }
        })
        .finally(() => {
          setisLoading(false);
        });
    }
  };

  const toogleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/empresas");
    }
  }, [session, router]);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            register={register}
            type="email"
            id="email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            label="Password"
            type="password"
            register={register}
            id="password"
            errors={errors}
            disabled={isLoading}
          />

          {variant === "REGISTER" ? (
            <Input
              label="Admin"
              type="checkbox"
              register={register}
              id="admin"
              errors={errors}
              disabled={isLoading}
            />
          ) : null}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toogleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
}
