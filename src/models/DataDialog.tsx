export interface DataDialog {
    handleOk: () => void;
    handleClose: () => void;
    open: boolean;
    title: string;
    content: string;
    loading: boolean;
}
