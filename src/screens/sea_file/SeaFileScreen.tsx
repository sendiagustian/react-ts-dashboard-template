import { Button, Stack, Typography } from "@mui/material";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useGlobal } from "../../context/GlobalContext";
import { uploadFile } from "./queries/QuerySeaFile";

export default function SeaFileScreen() {
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File | null>(null);

    const { isAction, setAction } = useGlobal();

    const handleClickButton = (): void => {
        uploadInputRef.current && uploadInputRef.current.click();
    };

    const handleSubmit = async () => {
        setAction(true);

        if (files !== null) {
            // getToken();
            await uploadFile({
                file: files,
                parent_dir: "/",
                replace: 1,
            }).then((res) => {
                console.log(res);
                setAction(false);
                setFiles(null);
            });
        }
    };

    return (
        <Stack>
            <AppBreadcrumbs mainMenu="SeaFile" />
            <Stack direction="row" alignItems="center" justifyItems="center">
                <Typography sx={{ mr: 2 }}>Pilih file (*) :</Typography>
                <input
                    ref={uploadInputRef}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const file: File = e.target.files![0];
                        setFiles(file);
                    }}
                />
                {files !== null ? <Typography>{files?.name}</Typography> : <Typography>File not selected</Typography>}
            </Stack>
            {files === null ? (
                <Button variant="contained" sx={{ width: 150, mt: 1 }} onClick={handleClickButton}>
                    Upload
                </Button>
            ) : (
                <LoadingButton
                    endIcon={<SendIcon />}
                    loading={isAction}
                    loadingPosition="end"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ width: 150, mt: 1 }}
                >
                    Submit
                </LoadingButton>
            )}
        </Stack>
    );
}
