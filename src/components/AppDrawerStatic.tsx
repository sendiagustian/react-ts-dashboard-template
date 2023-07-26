import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { routeMainMenus, routeSettingMenus } from "../routes/RouteMenuList";
import { useState } from "react";
import { MenuModel } from "../models/MenuModel";

const drawerWidth = 240;

export default function AppDrawerStatic() {
    const location = useLocation();

    const [title, setTitle] = useState("Dashboard");

    function isSelected(url: string): boolean {
        if (location.pathname == url) {
            return true;
        } else {
            return false;
        }
    }

    function handleClick(menu: MenuModel) {
        const navigate = useNavigate();

        return () => {
            setTitle(menu.name);
            navigate(menu.url);
        };
    }

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <AdbIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        REACT X FB
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {routeMainMenus.map((menu) => (
                        <ListItem
                            key={menu.url}
                            disablePadding
                            sx={{
                                background: isSelected(menu.url) ? "#e3f2fd" : "null",
                            }}
                        >
                            <ListItemButton onClick={handleClick(menu)}>
                                <ListItemIcon key={menu.name} sx={{ color: isSelected(menu.url) ? "black" : "white" }}>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={menu.name}
                                    sx={{ color: isSelected(menu.url) ? "black" : "white" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {routeSettingMenus.map((settings) => (
                        <ListItem
                            key={settings.name}
                            disablePadding
                            sx={{
                                background: isSelected(settings.url) ? "#e3f2fd" : "null",
                            }}
                        >
                            <ListItemButton onClick={handleClick(settings)}>
                                <ListItemIcon sx={{ color: isSelected(settings.url) ? "black" : "white" }}>
                                    {settings.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={settings.name}
                                    sx={{ color: isSelected(settings.url) ? "black" : "white" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
