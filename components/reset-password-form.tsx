"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      setError("Invalid or missing reset token. Please request a new password reset.");
    }
  }, [token]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.resetPassword(
        {
          token: token!,
          newPassword: password,
        },
        {
          onError: (ctx) => {
            setError(
              ctx.error.message ||
                "Failed to reset password. The link may have expired. Please try again."
            );
            setIsLoading(false);
          },
          onSuccess: () => {
            // Redirect to login on success
            router.push("/login?passwordReset=success");
          },
        }
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to reset password. The link may have expired. Please try again."
      );
      setIsLoading(false);
    }
  }

  if (!isTokenValid) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              The password reset link is invalid or has expired
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please request a new password reset link.
              </p>

              <Link href="/forgot-password">
                <Button className="w-full">Request New Reset Link</Button>
              </Link>

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
          <CardTitle>Create a new password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>

                <FieldDescription className="text-center">
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
