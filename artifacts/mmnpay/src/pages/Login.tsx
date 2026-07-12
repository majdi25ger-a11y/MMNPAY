import { useState } from "react";
import { useLocation } from "wouter";
import * as authRepository from "@/lib/repositories/authRepository";
import * as organizationRepository from "@/lib/repositories/organizationRepository";

interface LoginForm {
  email: string;
  password: string;
}

const DEFAULT_FORM: LoginForm = {
  email: "",
  password: ""
};

export default function Login() {

  const [, navigate] = useLocation();

  const [form, setForm] = useState<LoginForm>(DEFAULT_FORM);
  const [error, setError] = useState("");

  function update<K extends keyof LoginForm>(key: K, value: LoginForm[K]) {

    setForm((prev) => ({
      ...prev,
      [key]: value
    }));

  }

  async function handleLogin() {

    setError("");

    if (!form.email || !form.password) {
      setError("Invalid email or password.");
      return;
    }

    try {

      const user = await authRepository.login(form.email, form.password);

      const organization = await organizationRepository.getOrganizationByUser(user.id);

      if (organization) {
        navigate("/dashboard");
      } else {
        navigate("/create-organization");
      }

    } catch {

      setError("Invalid email or password.");

    }

  }

  return (

    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            MMNPAY
          </h1>

          <p className="text-white/60 mt-2">
            Log in to manage your payments.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 md:p-10">

          <h2 className="text-2xl font-bold text-[#0a2540] mb-1">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Welcome back. Enter your details to continue.
          </p>

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Email
          </label>

          <input
            type="email"
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Password
          </label>

          <input
            type="password"
            className="w-full border rounded-xl p-3 mb-6"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-xl font-bold text-white bg-[#635bff]"
          >
            Login
          </button>

          <p className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-[#635bff] font-bold">
              Register
            </a>
          </p>

        </div>

      </div>

    </div>

  );

}
