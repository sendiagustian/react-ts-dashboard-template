import DashboardIcon from "@mui/icons-material/Dashboard";
import DataIcon from "@mui/icons-material/Dataset";
import SettingsIcon from "@mui/icons-material/Settings";
import MapIcon from "@mui/icons-material/Map";
import FolderIcon from "@mui/icons-material/Folder";
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
    maps: "/maps",
    seaFile: "/sea-file-test",
};

export const routeMainMenus: Array<MenuModel> = [
    { name: "Dashboard", url: "/", icon: <DashboardIcon /> },
    { name: "Users From Firebase", url: "/data-users-fb", icon: <DataIcon /> },
    { name: "Users From DB API", url: "/data-users-api", icon: <DataIcon /> },
    { name: "Maps", url: "/maps", icon: <MapIcon /> },
    { name: "Sea File Test", url: "/sea-file-test", icon: <FolderIcon /> },
];

export const routeSettingMenus: Array<MenuModel> = [{ name: "Settings", url: "/settings", icon: <SettingsIcon /> }];
