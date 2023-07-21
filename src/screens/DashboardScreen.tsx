import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppBreadcrumbs from "../components/Breadcrumbs";

const DashboardScreen = () => {
    return (
        <Stack>
            <AppBreadcrumbs mainMenu="Dashboard" />
            <Typography color="white">Ini Dashboard</Typography>
        </Stack>
    );
};

export default DashboardScreen;
