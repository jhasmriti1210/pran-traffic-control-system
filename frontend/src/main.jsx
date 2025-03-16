import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: "dark",
        variables: {
          colorPrimary: "#ffffff", // Dark Blue
          colorSuccess: "#ffffff", // White
          colorBackground: "#0c8524", // Deep navy background
          colorText: "#ffffff", // Soft greenish text
          colorTextOnPrimaryBackground: "#ffffff",
        },
        elements: {
          card: {
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(177, 21, 21, 0.3)",
            backgroundColor: "#ffffff",
          },
          buttonPrimary: {
            backgroundColor: "#ffffff",
            color: "#ffffff", // Black text for visibility
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ffffff" }, // Light gray on hover
          },
          buttonSecondary: {
            backgroundColor: "#ffffff",
            color: "#ffffff", // Black text for visibility
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ffffff" }, // Darker green on hover
          },
          // Fix text color inside Manage Account modal
          userButtonPopoverActionButton: {
            color: "#ffffff", // White text
            "&:hover": { color: "#ffffff" }, // Light gray on hover
          },
          userButtonPopoverActionButtonText: {
            color: "#ffffff", // White text
          },
        },
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
