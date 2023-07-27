import NotFoundScreen from "../screens/NotFoundScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AppDrawerDynamic from "../components/AppDrawerDynamic";
import DataUsersFirebaseScreen from "../screens/data_users_firebase/DataUsersFirebaseScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddDataUserFirebaseScreen from "../screens/data_users_firebase/AddDataUserFirebaseScreen";
import DataUsersAPIScreen from "../screens/data_users_api/DataUsersAPIScreen";
import UpdateDataUserFirebaseScreen from "../screens/data_users_firebase/UpdateDataUserFirebaseScreen";
import AddDataUsersAPIScreen from "../screens/data_users_api/AddDataUsersAPIScreen";
import UpdateDataUsersAPIScreen from "../screens/data_users_api/UpdateDataUsersAPIScreen";
import LoginScreen from "../screens/auth/LoginScreen";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routePath } from "./RouteMenuList";
import MapsScreen from "../screens/maps/MapsScreen";
import SeaFileScreen from "../screens/sea_file/SeaFileScreen";

const AppRoutes = () => {
    const token: string | null = localStorage.getItem("key-token");

    return (
        <BrowserRouter basename="/">
            {token != null ? (
                <Routes>
                    <Route path="*" element={<NotFoundScreen />} />
                    <Route path={routePath.profile} element={<ProfileScreen />} />

                    <Route path="/" element={<AppDrawerDynamic />}>
                        <Route path={routePath.login} element={<Navigate to={routePath.dashboard} />} />
                        <Route path={routePath.dashboard} element={<DashboardScreen />} />

                        <Route path={routePath.dataUsersFirebase} element={<DataUsersFirebaseScreen />} />
                        <Route path={routePath.addDataUsersFirebase} element={<AddDataUserFirebaseScreen />} />
                        <Route path={routePath.updateDataUsersFirebase} element={<UpdateDataUserFirebaseScreen />} />

                        <Route path={routePath.dataUsersAPI} element={<DataUsersAPIScreen />} />
                        <Route path={routePath.addDataUsersAPI} element={<AddDataUsersAPIScreen />} />
                        <Route path={routePath.updateDataUsersAPI} element={<UpdateDataUsersAPIScreen />} />

                        <Route path={routePath.maps} element={<MapsScreen />} />

                        <Route path={routePath.seaFile} element={<SeaFileScreen />} />

                        <Route path={routePath.settings} element={<SettingsScreen />} />
                    </Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="*" element={<Navigate to={routePath.login} />} />
                    <Route path={routePath.login} element={<LoginScreen />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default AppRoutes;
