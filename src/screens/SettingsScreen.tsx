import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppBreadcrumbs from "../components/Breadcrumbs";

function SettingsScreen() {
    return (
        <Stack>
            <AppBreadcrumbs mainMenu="Settings" />
            <Typography color="white">Ini Data Users Screen</Typography>
        </Stack>
    );
}

export default SettingsScreen;
