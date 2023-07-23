import Stack from "@mui/material/Stack";
import Breadcrumbs from "../../components/Breadcrumbs";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import { RoleModel } from "../../models/RoleModel";
import { useLocation, useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { routeDataUsersFirebase } from "../../routes/AppRoutes";

import { roles } from "./data/ListRoles";
import slugify from "react-slugify";
import { UserFirestoreModel } from "../../models/UserFirestoreModel";
import { toPascalCase } from "../../utils/ConvertString";
import { updateUser } from "./queries/QueryUsersFirestore";

export default function UpdateDataUserFirebaseScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const state: UserFirestoreModel = location.state;

    const [isAction, setAction] = useState<boolean>(false);
    const [appName, setAppName] = useState<string>(state.appName);
    const [fullName, setFullName] = useState<string>(state.name);
    const [phone, setPhone] = useState<string>(state.phone);
    const [point, setPoint] = useState<string>(state.point.toString());
    const [role, setRole] = useState<RoleModel>({
        label: toPascalCase(state.role),
        value: slugify(state.role),
    });

    const handleClearButton = (): void => {
        setAppName("");
        setFullName("");
        setPhone("");
        setPoint("");
        setRole(roles[0]);
    };

    const handleSubmitButton = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>): void => {
        event.preventDefault();

        setAction(true);

        const uid: string = state.docUid;
        const userDataUpdate = {
            docUid: uid,
            appName: appName,
            name: fullName,
            phone: phone,
            point: point ? Number(point) : 0,
            role: role.value,
        };

        updateUser(uid, userDataUpdate).then((_res) => {
            setAction(false);
            navigate(routeDataUsersFirebase);
        });
    };

    return (
        <Stack direction="column" alignItems="stretch" width="100%">
            <Breadcrumbs mainMenu="UpdateDataUserFirebase"></Breadcrumbs>
            <form onSubmit={handleSubmitButton}>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>App Name (*)</Typography>
                    <TextField
                        required
                        id="app-name"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Full Name (*)</Typography>
                    <TextField
                        required
                        id="full-name"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Phone Number (*)</Typography>
                    <TextField
                        required
                        id="phone"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Point User (*)</Typography>
                    <TextField
                        required
                        id="point"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="number"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Role User (*)</Typography>
                    <Autocomplete
                        disablePortal
                        id="role-user"
                        options={roles}
                        fullWidth={true}
                        size="small"
                        value={role}
                        onChange={(_e, values) => (values ? setRole(values) : null)}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormLabel>
                <Stack direction="row" sx={{ marginTop: 2 }}>
                    <Button variant="outlined" onClick={handleClearButton} sx={{ marginRight: 2 }}>
                        Clear
                    </Button>
                    <LoadingButton
                        endIcon={<SendIcon />}
                        loading={isAction}
                        loadingPosition="end"
                        variant="contained"
                        type="submit"
                    >
                        Update
                    </LoadingButton>
                </Stack>
            </form>
        </Stack>
    );
}
