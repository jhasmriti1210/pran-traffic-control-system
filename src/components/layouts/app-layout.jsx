import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's authentication hook
import Header from "./Header";

const AppLayout = () => {
  const { isSignedIn } = useAuth(); // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/"); // Redirect user to chatbot after login
    }
  }, [isSignedIn, navigate]);

  return (
    <div>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
