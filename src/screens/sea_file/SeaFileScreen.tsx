import { Button, Stack, Typography } from "@mui/material";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useGlobal } from "../../context/GlobalContext";
import { uploadFile } from "./queries/QuerySeaFile";
import axios, { AxiosRequestConfig } from "axios";

export default function SeaFileScreen() {
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File | null>(null);
    const [resLink, setResLink] = useState("");

    const { onActioning, setActioning } = useGlobal();

    const handleClickButton = (): void => {
        uploadInputRef.current && uploadInputRef.current.click();
    };

    useEffect(() => {
        const reqHeader: AxiosRequestConfig = {
            headers: {
                Authorization: `Token fd44f519e43804f8f0f14880f4060898bfcdfe54`,
            },
        };

        axios
            .get(
                "https://seafile.protonema.co.id/api2/repos/f037b658-bf74-4269-8ce4-b3c98fb2ca9e/upload-link/?p=/",
                reqHeader
            )
            .then((res) => {
                setResLink(res.data);
                console.log(resLink);
            });
    }, []);

    const handleSubmit = async () => {
        setActioning(true);

        // getUploadLink();
        if (files !== null) {
            await uploadFile(resLink, {
                file: files,
                parent_dir: "/",
                replace: 1,
            }).then((res) => {
                console.log(res);
                setActioning(false);
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
                    loading={onActioning}
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
