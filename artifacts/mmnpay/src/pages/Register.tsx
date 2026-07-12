import { useState } from "react";
import { useLocation } from "wouter";
import * as authRepository from "@/lib/repositories/authRepository";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const DEFAULT_FORM: RegisterForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function Register() {

  const [, navigate] = useLocation();

  const [form, setForm] = useState<RegisterForm>(DEFAULT_FORM);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof RegisterForm>(key: K, value: RegisterForm[K]) {

    setForm((prev) => ({
      ...prev,
      [key]: value
    }));

  }

  function handleCreateAccount() {

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      authRepository.register({
        fullName: form.fullName,
        email: form.email,
        password: form.password
      });

      navigate("/login");

    } catch (err) {

      setError(err instanceof Error ? err.message : "Unable to create account.");

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
            Create your account to start accepting payments.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 md:p-10">

          <h2 className="text-2xl font-bold text-[#0a2540] mb-1">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            It only takes a minute to get started.
          </p>

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Full Name
          </label>

          <input
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />

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
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full border rounded-xl p-3 mb-6"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
          />

          <label className="flex items-start gap-3 mb-6 cursor-pointer">

            <input
              type="checkbox"
              className="mt-1 w-4 h-4"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />

            <span className="text-gray-600 text-sm">
              I agree to the Terms of Service.
            </span>

          </label>

          {error && (
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            disabled={!agreed}
            onClick={handleCreateAccount}
            className={`w-full py-4 rounded-xl font-bold text-white ${
              agreed ? "bg-[#635bff]" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Create Account
          </button>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#635bff] font-bold">
              Login
            </a>
          </p>

        </div>

      </div>

    </div>

  );

}
