"use client";
import { Logo } from "@/components/ui/logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";

const LoginPage = () => {
  const router = useRouter();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result.ok) {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        form.reset();
        router.push("/dashboard");
        router.refresh();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid email or password",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-md w-full relative z-10 transition-all duration-500">
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <h1 className="text-3xl font-black text-base-content tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-base-content/60">Login to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full pl-12 h-14 rounded-2xl border  focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full pl-12 h-14 rounded-2xl border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 mt-4 capitalize"
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
