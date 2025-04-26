import { ForgotPasswordForm } from "@/features/forgot-password/components/ForgotPasswordForm";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;