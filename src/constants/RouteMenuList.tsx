import DashboardIcon from "@mui/icons-material/Dashboard";
import DataIcon from "@mui/icons-material/Dataset";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { MenuModel } from "../models/MenuModel";

export const routeMenus: Array<MenuModel> = [
    { name: "Dashboard", url: "/", icon: <DashboardIcon /> },
    { name: "Users Firebase", url: "/data-users-fb", icon: <DataIcon /> },
    { name: "Users SQL", url: "/data-users-api", icon: <DataIcon /> },
];

export const routeSettings: Array<MenuModel> = [
    { name: "Profil", url: "/profile", icon: <ProfileIcon /> },
    { name: "Settings", url: "/settings", icon: <SettingsIcon /> },
];
