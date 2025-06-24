'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';

const schema = z.object({
  username: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupInput = z.infer<typeof schema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Signup failed');
      alert('Account created! Redirecting...');
      window.location.href = '/';
    } catch (err) {
      alert(`Error signing up ${err}`);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-white">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            {...register('username')}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition"
        >
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-300">
        Already have an account?{' '}
        <Link href="/" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
