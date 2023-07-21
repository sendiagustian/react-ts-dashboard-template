import { Stack, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import AppBreadcrumbs from "../components/Breadcrumbs";
import { removeFromRight } from "../utils/ArrayRemove";
import slugify from "react-slugify";

const NotFoundScreen = () => {
    const location = useLocation();
    const data: Array<string> = location.pathname.split("/");
    data[0] = "Notfond";

    function onBackDashboard() {
        console.log(data.length);
        console.log(data);
        data.shift();
        console.log(`/${removeFromRight(data, slugify("data")).join("/")}`);
        return () => {};
    }

    return (
        <Stack justifyContent="center" alignItems="center" direction="column" height="80vh">
            <AppBreadcrumbs mainMenu="Notfond" />
            <Typography alignContent="center">404 Not Page Found</Typography>
            <Button onClick={onBackDashboard}>Back To Dashboard</Button>
        </Stack>
    );
};

export default NotFoundScreen;
