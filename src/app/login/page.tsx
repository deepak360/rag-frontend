"use client";
import AuthForm from "../../components/Auth/Form";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: Parameters<typeof login>[0]) => {
    await login(data.email, data.password);
    router.push("/dashboard");
  };

  return <AuthForm onSubmit={onSubmit} label="Log in" />;
}
