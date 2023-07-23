import NotFoundScreen from "../screens/NotFoundScreen";
import DashboardScreen from "../screens/DashboardScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppDrawerDynamic from "../components/AppDrawerDynamic";
import DataUsersFirebaseScreen from "../screens/data_users_firebase/DataUsersFirebaseScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddDataUserFirebaseScreen from "../screens/data_users_firebase/AddDataUserFirebaseScreen";
import DataUsersAPIScreen from "../screens/data_users_api/DataUsersAPIScreen";
import UpdateDataUserFirebaseScreen from "../screens/data_users_firebase/UpdateDataUserFirebaseScreen";
import AddDataUsersAPIScreen from "../screens/data_users_api/AddDataUsersAPIScreen";
import UpdateDataUsersAPIScreen from "../screens/data_users_api/UpdateDataUsersAPIScreen";

export const routeDashboard: string = "/";

export const routeDataUsersFirebase: string = "/data-users-fb";
export const routeAddDataUsersFirebase: string = "/data-users-fb/add-data-users-fb";
export const routeUpdateDataUsersFirebase: string = "/data-users-fb/update-data-users-fb";

export const routeDataUsersAPI: string = "/data-users-api";
export const routeAddDataUsersAPI: string = "/data-users-api/add-data-users-api";
export const routeUpdateDataUsersAPI: string = "/data-users-api/update-data-users-api";

export const routeSettings: string = "/settings";
export const routeProfile: string = "/Profile";

const Dashboard: JSX.Element = <AppDrawerDynamic title="Dashboard Screen" screen={<DashboardScreen />} />;

// CRUD With Firebase
const DataUsersFirebase: JSX.Element = (
    <AppDrawerDynamic title="Data Users Firebase" screen={<DataUsersFirebaseScreen />} />
);
const AddDataUserFirebase: JSX.Element = (
    <AppDrawerDynamic title="Data Users Firebase" screen={<AddDataUserFirebaseScreen />} />
);
const UpdateDataUserFirebase: JSX.Element = (
    <AppDrawerDynamic title="Data Users Firebase" screen={<UpdateDataUserFirebaseScreen />} />
);

const DataUsersAPI: JSX.Element = <AppDrawerDynamic title="Data Users API" screen={<DataUsersAPIScreen />} />;
const AddDataUsersAPI: JSX.Element = <AppDrawerDynamic title="Add Data Users API" screen={<AddDataUsersAPIScreen />} />;
const UpdateDataUsersAPI: JSX.Element = (
    <AppDrawerDynamic title="Update Data Users API" screen={<UpdateDataUsersAPIScreen />} />
);

const Settings: JSX.Element = <AppDrawerDynamic title="Settings Screen" screen={<SettingsScreen />} />;
const Profile: JSX.Element = <AppDrawerDynamic title="Profile Screen" screen={<ProfileScreen />} />;

const AppRoutes = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route index path="*" element={<NotFoundScreen />} />
                <Route index path={routeDashboard} element={Dashboard} />

                <Route index path={routeDataUsersFirebase} element={DataUsersFirebase} />
                <Route index path={routeAddDataUsersFirebase} element={AddDataUserFirebase} />
                <Route index path={routeUpdateDataUsersFirebase} element={UpdateDataUserFirebase} />

                <Route index path={routeDataUsersAPI} element={DataUsersAPI} />
                <Route index path={routeAddDataUsersAPI} element={AddDataUsersAPI} />
                <Route index path={routeUpdateDataUsersAPI} element={UpdateDataUsersAPI} />

                <Route index path={routeSettings} element={Settings} />
                <Route index path={routeProfile} element={Profile} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
