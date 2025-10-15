"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
      });
      // Redirect to workspaces on successful login
      router.push("/workspaces");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      // Use window.location.href for server-side redirect to avoid client-side issues
      const response = await authClient.signIn.social({
        provider: "google",
      });

      // If the response contains a redirect URL, use it
      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        // Fallback to client-side redirect
        router.push("/workspaces");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Bare Theme with Focus Image */}
      <div className=" w-1/3 bg-muted/50 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/focus12.jpeg"
            alt="Focus"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Right Side - Bare Form */}
      <div className="flex-1 w-3/4 flex items-center justify-center ">
        <div className="w-full max-w-xs">
          {/* Logo */}
          <div className="text-start mb-8">
            <span className="text-xl font-bold text-foreground">
              Locked
              <span className="bg-foreground rounded-sm font-bold text-xl px-1 mx-0.5 text-background">
                In
              </span>
            </span>
          </div>

          {/* <div className="text-start mb-8">
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          </div> */}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}

          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground text-xs">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 font-medium text-xs"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
