import { Navigate, Route, Routes } from "react-router";
import AboutPage from "./pages/AboutPage";
import AddDevicePage from "./pages/AddDevicePage";
import AddUserPage from "./pages/AddUserPage";
import DevicePage from "./pages/DevicePage";
import DevicesPage from "./pages/DevicesPage";
import HomePage from "./pages/HomePage";
import ServicesDevicesTestPage from "./pages/ServicesDevicesTestPage";
import ServicesMeasuresDetailsPage from "./pages/ServicesMeasuresDetailsPage";
import ServicesMeasuresMonitorPage from "./pages/ServicesMeasuresMonitorPage";
import ServicesMeasuresPage from "./pages/ServicesMeasuresPage";
import ServicesPlacesPage from "./pages/ServicesPlacesPage";
import ServicesVideoCallStreamPage from "./pages/ServicesVideoCallStreamPage";
import SettingsAboutPage from "./pages/SettingsAboutPage";
import SettingsContractPage from "./pages/SettingsContractPage";
import SettingsGraphicPage from "./pages/SettingsGraphicPage";
import SignInPage from "./pages/SignInPage";
import UserBioPage from "./pages/UserBioPage";
import UserMeasuresLimitsMenuPage from "./pages/UserMeasuresLimitsMenuPage";
import UserMeasuresLimitsPage from "./pages/UserMeasuresLimitsPage";
import UserMeasuresScheduledPage from "./pages/UserMeasuresScheduledPage";
import UserMenuPage from "./pages/UserMenuPage";
import UserPage from "./pages/UserPage";
import UserPrivacyPage from "./pages/UserPrivacyPage";
import UsersPage from "./pages/UsersPage";
import UserWorkoutMeasuresLimitsPage from "./pages/UserWorkoutMeasuresLimitsPage";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/add-device" element={<AddDevicePage />} />
        <Route path="/device/:id" element={<DevicePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/user-menu/:userId" element={<UserMenuPage />} />
        <Route path="/user-privacy/:userId" element={<UserPrivacyPage />} />
        <Route path="/user-bio/:userId" element={<UserBioPage />} />
        <Route path="/user-measures-scheduled/:userId" element={<UserMeasuresScheduledPage />} />
        <Route path="/user-measures-limits/:userId" element={<UserMeasuresLimitsPage />} />
        <Route path="/user-measures-limits/:userId/:workoutId" element={<UserWorkoutMeasuresLimitsPage />} />
        <Route path="/user-measures-limits-menu/:userId" element={<UserMeasuresLimitsMenuPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/settings/graphic" element={<SettingsGraphicPage />} />
        <Route path="/settings/about" element={<SettingsAboutPage />} />
        <Route path="/settings/contract" element={<SettingsContractPage />} />
        <Route path="/services/measures" element={<ServicesMeasuresPage />} />
        <Route path="/services/measures-details/:id" element={<ServicesMeasuresDetailsPage />} />
        <Route path="/services/measures-monitor" element={<ServicesMeasuresMonitorPage />} />
        <Route path="/services/places" element={<ServicesPlacesPage />} />
        <Route path="/services/devices-test" element={<ServicesDevicesTestPage />} />
        <Route path="/services/access" element={<ServicesVideoCallStreamPage />} />
      </Routes>
  );
};

export default AppRouter;
