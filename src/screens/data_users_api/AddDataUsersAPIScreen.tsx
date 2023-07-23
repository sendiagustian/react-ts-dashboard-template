import Stack from "@mui/material/Stack";
import Breadcrumbs from "../../components/Breadcrumbs";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";

import { SyntheticEvent, useState } from "react";

import { listGenders } from "./data/ListGenders";
import { addUser } from "./queries/QueryUserAPI";
import { useNavigate } from "react-router-dom";

export default function AddDataUserAPIScreen() {
    const navigate = useNavigate();

    const [isAction, setAction] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>(listGenders[0]);

    const handleClearButton = (): void => {
        setName("");
        setEmail("");
        setPassword("");
        setGender(listGenders[0]);
    };

    const handleSubmitButton = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault();

        setAction(true);

        const userDataAdd = {
            userName: name,
            userEmail: email,
            userPassword: password,
            userGender: gender,
        };

        addUser(navigate, userDataAdd);
        setAction(false);
    };

    return (
        <Stack direction="column" alignItems="stretch" width="100%">
            <Breadcrumbs mainMenu="AddDataUserAPI"></Breadcrumbs>
            <form onSubmit={handleSubmitButton}>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Name (*)</Typography>
                    <TextField
                        required
                        id="name"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Email (*)</Typography>
                    <TextField
                        required
                        id="email"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Password (*)</Typography>
                    <TextField
                        required
                        id="password"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormLabel>
                <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Typography sx={{ width: 200 }}>Gender (*)</Typography>
                    <Autocomplete
                        disablePortal
                        id="gender"
                        options={listGenders}
                        fullWidth={true}
                        size="small"
                        value={gender}
                        onChange={(_e, values) => (values ? setGender(values) : null)}
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
