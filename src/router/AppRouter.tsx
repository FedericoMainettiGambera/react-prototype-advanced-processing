import type { PropsWithChildren } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DevicesPage from "./pages/DevicesPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import UsersPage from "./pages/UsersPage";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  // const { subjectsLog } = useAuth();

  // console.log(subjectsLog);

  // if (!subjectsLog) {
  //   return <Navigate to="/signin" replace />;
  // }

  return children;
};

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
  );
};

export default AppRouter;
