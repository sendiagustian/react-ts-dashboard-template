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
import { useLocation, useNavigate } from "react-router-dom";
import { routeMenus, routeSettings } from "../constants/RouteMenuList";

const drawerWidth = 240;

const AppDrawer = (props: { screen: JSX.Element; title: string }) => {
    const location = useLocation();

    function isSelected(url: string): boolean {
        if (location.pathname == url) {
            return true;
        } else {
            return false;
        }
    }

    function handleClick(url: string) {
        const navigate = useNavigate();

        return () => {
            navigate(url);
        };
    }

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {props.title}
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
                    {routeMenus.map((menu) => (
                        <ListItem
                            key={menu.url}
                            disablePadding
                            sx={{
                                background: isSelected(menu.url) ? "#e3f2fd" : "null",
                            }}
                        >
                            <ListItemButton onClick={handleClick(menu.url)}>
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
                    {routeSettings.map((settings) => (
                        <ListItem
                            key={settings.name}
                            disablePadding
                            sx={{
                                background: isSelected(settings.url) ? "#e3f2fd" : "null",
                            }}
                        >
                            <ListItemButton onClick={handleClick(settings.url)}>
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
                {props.screen}
            </Box>
        </Box>
    );
};

export default AppDrawer;
