"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Mail, User, ChevronRight, Shield, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";

export function SignUpClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const success = register(name, email, password);
    setLoading(false);

    if (success) {
      router.push(redirect);
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#C62828] p-12 xl:p-16 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-40 left-20 w-64 h-64 rounded-full bg-[#E53935] blur-3xl" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                Auto<span className="text-[#E53935]">Prestige</span>
              </span>
            </Link>

            <div className="mt-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl xl:text-5xl font-bold text-white leading-tight"
              >
                Join the
                <br />
                <span className="text-[#E53935]]">Auto Community</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 text-lg text-white/60 max-w-md leading-relaxed"
              >
                Create your account and unlock exclusive deals, faster checkout, and personalized recommendations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-10 space-y-4"
              >
                {[
                  { icon: User, text: "Personalized recommendations based on your car" },
                  { icon: Truck, text: "Free shipping on orders above ₹999" },
                  { icon: Shield, text: "1-year warranty on all premium products" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#E53935]" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 flex items-center gap-4 text-white/40 text-xs"
          >
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span>Rated 4.9★ by 50,000+ happy customers</span>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-[#F8F8F8] via-white to-[#FFF5F5]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 lg:hidden mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E53935] to-[#C62828] flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-semibold tracking-tight text-[#111111]">
                  Auto<span className="text-[#E53935]">Prestige</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#111111]">Create Account</h1>
              <p className="text-sm text-[#666666] mt-1.5">Join us and get 10% off your first order</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5 tracking-wide uppercase">
                  Full Name
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="rounded-xl border-[#ECECEC] bg-[#FAFAFA] focus:bg-white focus:border-[#E53935] transition-all h-12 px-4"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5 tracking-wide uppercase">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl border-[#ECECEC] bg-[#FAFAFA] focus:bg-white focus:border-[#E53935] transition-all h-12 px-4"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="rounded-xl border-[#ECECEC] bg-[#FAFAFA] focus:bg-white focus:border-[#E53935] transition-all pr-12 h-12 px-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#111111] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#666666] mb-1.5 tracking-wide uppercase">
                  Confirm Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="rounded-xl border-[#ECECEC] bg-[#FAFAFA] focus:bg-white focus:border-[#E53935] transition-all h-12 px-4"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#E53935] to-[#C62828] hover:from-[#C62828] hover:to-[#E53935] text-white rounded-full h-12 font-semibold disabled:opacity-50 shadow-sm shadow-red-200 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </span>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ECECEC]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-[#999999]">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: "Google",
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  icon: (
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-[#ECECEC] bg-white hover:bg-[#FAFAFA] hover:border-[#E53935]/30 transition-all text-sm font-medium text-[#666666] hover:text-[#111111] active:scale-[0.98]"
                >
                  {provider.icon}
                  {provider.name}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-[#666666] mt-6">
              Already have an account?{" "}
              <Link
                href={`/sign-in?redirect=${encodeURIComponent(redirect)}`}
                className="text-[#E53935] font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                Sign In <ChevronRight className="w-3 h-3" />
              </Link>
            </p>

            <p className="text-center text-xs text-[#999999] mt-6 leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#666666] hover:text-[#111111] underline underline-offset-2">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#666666] hover:text-[#111111] underline underline-offset-2">Privacy Policy</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
