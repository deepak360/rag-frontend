'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg">
        {children}
      </div>
    </div>
  );
}
