import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Chatbot from "./components/Chatbot";
import AppLayout from "./components/layouts/app-layout";
import Gamified from "./components/Gamified";
import Quiz from "./components/Quiz";
import Contact from "./components/Contact";
import Scheme from "./components/Scheme";
import Predictionmodel from "./components/Predictionmodel";
import Optimizationmodel from "./components/Best-route-planner";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chatbot",
        element: <Chatbot />,
      },
      {
        path: "/gamified",
        element: <Gamified />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/schemes/:district",
        element: <Scheme />,
      },
      {
        path: "/prediction",
        element: <Predictionmodel />,
      },
      {
        path: "/best-route",
        element: <Optimizationmodel />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
