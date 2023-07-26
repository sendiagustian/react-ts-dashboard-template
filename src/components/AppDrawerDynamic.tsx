import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdbIcon from "@mui/icons-material/Adb";
import { routeMainMenus, routePath, routeSettingMenus } from "../routes/RouteMenuList";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuModel } from "../models/MenuModel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const drawerWidth = 240;

export default function AppDrawerDynamic() {
    const location = useLocation();
    const theme = useTheme();

    const [openSideMenu, setOpenSideMenu] = useState(true);
    const [title, setTitle] = useState("");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        routeMainMenus.forEach((menu) => {
            if (location.pathname === menu.url) {
                setTitle(menu.name);
            } else {
                routeSettingMenus.forEach((setting) => {
                    if (location.pathname === setting.url) {
                        setTitle(setting.name);
                    }
                });
            }
        });
    }, []);

    const handleCloseProfileMenu = () => {
        setAnchorEl(null);
    };

    const handleClickProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpenSideMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenSideMenu(false);
    };

    function handleClickMenu(menu: MenuModel) {
        const navigate = useNavigate();

        return () => {
            setTitle(menu.name);
            navigate(menu.url);
        };
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={openSideMenu}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(openSideMenu && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClickProfileMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <MenuProfileIcon anchorEl={anchorEl} handleClose={handleCloseProfileMenu} />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openSideMenu}>
                <DrawerHeader>
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {routeMainMenus.map((mainMenu, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: "block", background: isSelected(mainMenu.url) ? "#e3f2fd" : "null" }}
                        >
                            <ListItemButton
                                onClick={handleClickMenu(mainMenu)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: openSideMenu ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: openSideMenu ? 3 : "auto",
                                        justifyContent: "center",
                                        color: isSelected(mainMenu.url) ? "black" : "white",
                                    }}
                                >
                                    {mainMenu.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={mainMenu.name}
                                    sx={{
                                        opacity: openSideMenu ? 1 : 0,
                                        color: isSelected(mainMenu.url) ? "black" : "white",
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {routeSettingMenus.map((settingMenu, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ display: "block", background: isSelected(settingMenu.url) ? "#e3f2fd" : "null" }}
                        >
                            <ListItemButton
                                onClick={handleClickMenu(settingMenu)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: openSideMenu ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: openSideMenu ? 3 : "auto",
                                        justifyContent: "center",
                                        color: isSelected(settingMenu.url) ? "black" : "white",
                                    }}
                                >
                                    {settingMenu.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={settingMenu.name}
                                    sx={{
                                        opacity: openSideMenu ? 1 : 0,
                                        color: isSelected(settingMenu.url) ? "black" : "white",
                                    }}
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

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

function isSelected(url: string): boolean {
    if (location.pathname == url) {
        return true;
    } else {
        return false;
    }
}

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const MenuProfileIcon = (props: { anchorEl: null | HTMLElement; handleClose(): void }) => {
    const navigate = useNavigate();
    return (
        <Menu
            sx={{ mt: "40px" }}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
        >
            <MenuItem
                onClick={() => {
                    props.handleClose;
                    navigate(routePath.profile);
                }}
            >
                Profile
            </MenuItem>
            <MenuItem
                onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                    props.handleClose;
                }}
            >
                Logout
            </MenuItem>
        </Menu>
    );
};
