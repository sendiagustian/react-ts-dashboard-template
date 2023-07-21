import { UserModelAPIModel } from "../../../models/UserModelAPIModel";

export interface HeadCell {
    disablePadding: boolean;
    id: keyof UserModelAPIModel;
    label: string;
    numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Full Name",
    },
    {
        id: "email",
        numeric: true,
        disablePadding: false,
        label: "Email",
    },
    {
        id: "gender",
        numeric: true,
        disablePadding: false,
        label: "Gender",
    },
];
