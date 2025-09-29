import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Root from "./components/Root";
import GoalPage from "./pages/Goal";
import AuthenticationPage from "./pages/Authentication";
import ToDoPage from "./pages/ToDo";
import GoalRoot from "./pages/GoalRoot";
import NotesPage from "./pages/Notes";
import NotePage from "./pages/Note";
import ProfilePage from "./pages/Profie";
import ErrorPage from "./pages/Error";
import MainPage from "./pages/Main";
import PersistLogin from "./pages/PersistLogin";
import PlanPage from "./pages/Plan";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "user",
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      { path: "auth", element: <AuthenticationPage /> },
      {
        element: <PersistLogin />,
        children: [
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "todo",
            element: <ToDoPage />,
          },
          {
            path: "goals/:goalId",
            element: <GoalRoot />,
            id: "goal",
            children: [
              { index: true, element: <GoalPage /> },
              { path: "plan", element: <PlanPage /> },
            ],
          },
          {
            path: "notes",
            children: [
              {
                index: true,
                element: <NotesPage />,
              },
              {
                path: ":noteId",
                element: <NotePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
