import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, {
  loader as searchGoalLoader,
  action as deleteGoalAction,
} from "./pages/Home";
import Root, { loader as userLoader } from "./components/Root";
import GoalPage from "./pages/Goal";
import { action as logoutAction } from "./components/LogOut";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as newGoalAction } from "./components/NewGoal/Modal";
import ToDoPage, { loader as toDoLoader } from "./pages/ToDo";
import { action as addNewTaskAction } from "./components/ToDo/ToDoList";
import PlanPage, { action as planAction } from "./pages/Plan";
import GoalRoot, { loader as goalLoader } from "./pages/GoalRoot";
import NotesPage, {
  action as notesAction,
  loader as notesLoader,
} from "./pages/Notes";
import NotePage, { loader as noteLoader } from "./pages/Note";
import ProfilePage, {action as profileAction} from "./pages/Profie";
import ErrorPage from "./pages/Error";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement:<ErrorPage/>,
      loader: userLoader,
      id: "user",
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: searchGoalLoader,
          action: deleteGoalAction,
        },
        { path: "auth", element: <AuthenticationPage />, action: authAction },
        { path: "profile", element: <ProfilePage />,
           action:profileAction
           },
        {
          path: "todo/:todoId",
          element: <ToDoPage />,
          action: addNewTaskAction,
          loader: toDoLoader,
        },
        {
          path: "goals/:goalId",
          element: <GoalRoot />,
          loader: goalLoader,
          id: "goal",
          children: [
            { index: true, element: <GoalPage /> },
            { path: "plan", element: <PlanPage />, action: planAction },
            {
              path: "notes",
              // element: <NotesPage />,
              children: [
                {
                  index: true,
                  element: <NotesPage />,
                  action: notesAction,
                  loader: notesLoader,
                },
                { path: ":noteId", element: <NotePage />, loader: noteLoader },
              ],
            },
          ],
        },
        { path: "newGoal", action: newGoalAction },
        { path: "logout", action: logoutAction },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
