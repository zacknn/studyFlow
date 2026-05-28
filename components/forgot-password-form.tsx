"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/app/lib/auth-client";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset(
        {
          email,
          redirectTo: `${window.location.origin}/reset-password`,
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message || "Failed to send reset email. Please try again.");
            setIsLoading(false);
          },
          onSuccess: () => {
            setSubmitted(true);
          },
        }
      );
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the link in the email to reset your password. The link expires in 24 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  try another email
                </button>
              </p>

              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              {error && (
                <FieldDescription className="text-red-500">
                  {error}
                </FieldDescription>
              )}

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <FieldDescription className="text-center">
                  Remember your password?{" "}
                  <Link href="/login">Back to Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
