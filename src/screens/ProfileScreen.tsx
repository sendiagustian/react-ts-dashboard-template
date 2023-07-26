import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppBreadcrumbs from "../components/Breadcrumbs";
import { UserAPIModel } from "../models/UserAPIModel";
import { getUserLogedin } from "../utils/UserDataLogedin";

function ProfileScreen() {
    const userData: UserAPIModel | null = getUserLogedin();

    return (
        <Stack justifyContent="center" alignItems="center" direction="column" height="90vh">
            <AppBreadcrumbs mainMenu="Profile" />
            <Typography color="white">Hallo, {userData?.name}</Typography>
        </Stack>
    );
}

export default ProfileScreen;
