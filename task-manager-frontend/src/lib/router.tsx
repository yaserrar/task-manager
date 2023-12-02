import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home";
import ErrorPage from "../components/pages/not-found";
import Login from "../components/pages/login";
import SignUp from "../components/pages/sign-up";
import Root from "../components/pages/root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
