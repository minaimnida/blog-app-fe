import ResetPasswordPage from "@/features/reset-password";
import React from "react";

const ResetPassword = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const token = (await params).token;
  return <ResetPasswordPage token={token} />;
};

export default ResetPassword;