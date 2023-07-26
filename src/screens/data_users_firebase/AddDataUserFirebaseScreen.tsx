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
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { routePath } from "../../routes/RouteMenuList";
import { v4 as uuid } from "uuid";

import { UserFirestoreModel } from "../../models/UserFirestoreModel";
import { roles } from "./data/ListRoles";
import { addUser } from "./queries/QueryUsersFirestore";

export default function AddDataUserFirebaseScreen() {
    const navigate = useNavigate();

    const [isAction, setAction] = useState<boolean>(false);

    const [appName, setAppName] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [point, setPoint] = useState<string>("");
    const [role, setRole] = useState<RoleModel>(roles[0]);

    function handleClearButton(): void {
        setAppName("");
        setFullName("");
        setPhone("");
        setPoint("");
        setRole(roles[0]);
    }

    function handleSubmitButton(event: SyntheticEvent<HTMLFormElement, SubmitEvent>): void {
        event.preventDefault();

        setAction(true);

        const generateUid: string = uuid();
        const uid: string = generateUid.replace(/-/g, "");
        const userDataAdd: UserFirestoreModel = {
            docUid: uid,
            appName: appName,
            name: fullName,
            phone: phone,
            point: point ? Number(point) : 0,
            role: role.value,
        };
        addUser(uid, userDataAdd).then((_res) => {
            setAction(false);
            navigate(routePath.dataUsersFirebase);
        });
    }

    return (
        <Stack direction="column" alignItems="stretch" width="100%">
            <Breadcrumbs mainMenu="AddDataUserFirebase"></Breadcrumbs>
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
                        Submit
                    </LoadingButton>
                </Stack>
            </form>
        </Stack>
    );
}
