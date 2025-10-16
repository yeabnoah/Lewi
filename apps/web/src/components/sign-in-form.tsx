import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex justify-center items-center px-8 relative">
        <div className="items-center mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 mx-auto flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold text-white">L</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            lewi.ai
          </h1>
        </div>
      </div>

      {/* Auth Section */}
      <div className="bg-white rounded-t-3xl px-8 py-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 leading-6">Sign in to your account</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="p-4 rounded-2xl border-gray-200 text-base"
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error?.message} className="text-red-500 text-sm">
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

          <div>
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    placeholder="Password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="p-4 rounded-2xl border-gray-200 text-base"
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error?.message} className="text-red-500 text-sm">
                      {error?.message}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full bg-black rounded-2xl py-4 text-white font-semibold text-lg hover:bg-gray-800 transition-colors"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={onSwitchToSignUp}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Need an account? Sign Up
          </Button>
        </div>

        <div className="mt-8 pt-6">
          <p className="text-center text-gray-500 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
