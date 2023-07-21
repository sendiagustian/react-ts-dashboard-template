//
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { DataDialog } from "../models/DataDialog";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AppDialog(dataDialog: DataDialog) {
    return (
        <Dialog open={dataDialog.open} onClose={dataDialog.loading ? () => false : dataDialog.handleClose}>
            <DialogTitle>{dataDialog.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dataDialog.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={dataDialog.handleClose}>
                    Cancel
                </Button>
                <LoadingButton
                    variant="contained"
                    loadingPosition="center"
                    loading={dataDialog.loading}
                    onClick={dataDialog.handleOk}
                >
                    Yes
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
