"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result.ok) {
        toast.success("Signed in successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error(
          "Invalid credentials. Please check your email and password.",
        );
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,201,0,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.04)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMjUiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4xMDcgMC0yLS44OTMtMi0yczAuODkzLTIgMi0yIDIgMC44OTMgMiAyLTAuODkzIDItMiAyem0tMTIgMGMtMS4xMDcgMC0yLS44OTMtMi0yczAuODkzLTIgMi0yIDIgMC44OTMgMiAyLTAuODkzIDItMiAyem0tNiA2Yy0xLjEwNyAwLTItLjg5My0yLTJzMC44OTMtMiAyLTIgMiAwLjg5MyAyIDItMC44OTMgMi0yIDJ6bTAgMTJjLTEuMTA3IDAtMi0uODkzLTItMnMwLjg5My0yIDItMiAyIDAuODkzIDIgMi0wLjg5MyAyLTIgMnptMTIgNmMtMS4xMDcgMC0yLS44OTMtMi0yczAuODkzLTIgMi0yIDIgMC44OTMgMiAyLTAuODkzIDItMiAyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative w-full max-w-md">
        <div className="relative backdrop-blur-xl bg-white/3 border border-white/6 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="absolute -inset-px bg-linear-to-b from-white/4 to-transparent rounded-3xl pointer-events-none" />

          <div className="relative space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center size-16 bg-primary-color/10 rounded-2xl mb-3 border border-primary-color/20">
                <div className="size-8 bg-background rounded-lg flex items-center justify-center border border-white/10">
                  <svg
                    className="size-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel data-invalid={fieldState.invalid}>
                        Email Address
                      </FieldLabel>
                      <div className="relative group">
                        <Mail
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-color transition-colors duration-300"
                        />
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          aria-invalid={fieldState.invalid}
                          className="pl-11"
                        />
                      </div>

                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel data-invalid={fieldState.invalid}>
                        Password
                      </FieldLabel>
                      <div className="relative group">
                        <Lock
                          size={16}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-color transition-colors duration-300"
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          aria-invalid={fieldState.invalid}
                          className="pl-11"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant={"ghost"}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>
                      </div>

                      {fieldState.error && (
                        <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                          <span className="size-1 rounded-full bg-red-400 inline-block" />
                          {fieldState.error.message}
                        </p>
                      )}
                    </Field>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 group"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
