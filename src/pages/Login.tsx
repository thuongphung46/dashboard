/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <div>
              <h1 className="text-lg font-semibold">Pyxis Admin</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your dashboard
              </p>
            </div>
          </div>

          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground"
                >
                  Remember me
                </label>
              </div>
              <a className="text-sm text-blue-600 hover:underline" href="#">
                Forgot?
              </a>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          © {new Date().getFullYear()} Pyxis — Your admin dashboard
        </p>
      </div>
    </div>
  );
}

export default Login;
