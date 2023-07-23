import { UserAPIModel } from "../../../models/UserAPIModel";

export interface HeadCell {
    disablePadding: boolean;
    id: keyof UserAPIModel;
    label: string;
    numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
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
