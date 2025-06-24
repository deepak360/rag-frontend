'use client'

import AuthForm from "@/components/Auth/Form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useEffect } from 'react';

type AuthInput = {
  email: string;
  password: string;
};

export default function Home() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.is_superuser) {
      router.push('/admin/dashboard');
    } else if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  const onSubmit = async (data: AuthInput) => {
    try {
      const user = await login(data);
      if (user?.is_superuser) {
        router.push('/admin/dashboard');
      } else if (user) {
        router.push("/dashboard");
      }
    } catch (err) {
      alert(`Invalid credentials! ${err}`);
    }
  };
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
      <AuthForm onSubmit={onSubmit} label="Log in" />
      <p className="text-sm text-center mt-4 text-gray-300">
        Do not have an account?{' '}
        <Link href="/signup" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );

}