import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppBreadcrumbs from "../components/Breadcrumbs";

function ProfileScreen() {
    return (
        <Stack>
            <AppBreadcrumbs mainMenu="Profile" />
            <Typography color="white">Ini Profile Screen</Typography>
        </Stack>
    );
}

export default ProfileScreen;
