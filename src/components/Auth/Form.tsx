'use client';
import { useForm } from 'react-hook-form';

type AuthInput = {
  email: string;
  password: string;
};

type AuthFormProps = {
  onSubmit: (data: AuthInput) => void;
  label: string;
};

export default function AuthForm({ onSubmit, label }: AuthFormProps) {
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthInput>();

  return (

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-white">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition"
        >
           {isSubmitting ? `${label}...` : label}
        </button>
      </form>
  );
}