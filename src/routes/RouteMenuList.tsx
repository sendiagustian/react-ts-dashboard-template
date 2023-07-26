import DashboardIcon from "@mui/icons-material/Dashboard";
import DataIcon from "@mui/icons-material/Dataset";
import SettingsIcon from "@mui/icons-material/Settings";
import { MenuModel } from "../models/MenuModel";

export const routePath = {
    login: "/login",
    dashboard: "/",
    dataUsersFirebase: "/data-users-fb",
    addDataUsersFirebase: "/data-users-fb/add-data-users-fb",
    updateDataUsersFirebase: "/data-users-fb/update-data-users-fb",
    dataUsersAPI: "/data-users-api",
    addDataUsersAPI: "/data-users-api/add-data-users-api",
    updateDataUsersAPI: "/data-users-api/update-data-users-api",
    settings: "/settings",
    profile: "/profile",
};

export const routeMainMenus: Array<MenuModel> = [
    { name: "Dashboard", url: "/", icon: <DashboardIcon /> },
    { name: "Users Firebase", url: "/data-users-fb", icon: <DataIcon /> },
    { name: "Users SQL", url: "/data-users-api", icon: <DataIcon /> },
];

export const routeSettingMenus: Array<MenuModel> = [{ name: "Settings", url: "/settings", icon: <SettingsIcon /> }];
