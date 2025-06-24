'use client';

import DashboardLayout from "@/components/Layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome 👋</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700">Card Title</h3>
          <p className="text-gray-500 text-sm mt-2">Some insightful content here.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700">Stats</h3>
          <p className="text-gray-500 text-sm mt-2">Dynamic data or analytics.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700">Activity</h3>
          <p className="text-gray-500 text-sm mt-2">User interactions or logs.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
