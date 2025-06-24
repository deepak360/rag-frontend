/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';
import { useAuth } from '@/context/AuthContext';

import DashboardLayout from "@/components/Layout/DashboardLayout";
const USERS_PER_PAGE = 5;

export default function AdminDashboard() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (user === null) return;

        if (!user.is_superuser) {
            router.push('/');
        } else {
            axios.get('http://localhost:8000/api/v1/admin/users').then(res => setUsers(res.data));
        }
    }, [router, user]);

    if (!user || !user.is_superuser) return null;

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

    console.log(users)
    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin - User Management</h1>

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-600 font-medium">ID</th>
                                <th className="py-3 px-4 text-left text-gray-600 font-medium">Email</th>
                                <th className="py-3 px-4 text-left text-gray-600 font-medium">Username</th>
                                <th className="py-3 px-4 text-left text-gray-600 font-medium">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((u) => (
                                <tr key={u?.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 text-gray-800">{u?.id}</td>
                                    <td className="py-2 px-4 text-gray-800">{u?.email}</td>
                                    <td className="py-2 px-4 text-gray-800">{u?.username}</td>
                                    <td className="py-2 px-4">
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${u.is_superuser ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                                            }`}>
                                            {u?.is_superuser ? "SuperAdmin" : "User"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-600 self-center">Page {currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="px-3 py-1 border rounded-md text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
}
