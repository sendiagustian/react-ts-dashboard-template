import { UserFirestoreModel } from "../../../models/UserFirestoreModel";

export interface HeadCell {
    disablePadding: boolean;
    id: keyof UserFirestoreModel;
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
        id: "appName",
        numeric: true,
        disablePadding: false,
        label: "App Name",
    },
    {
        id: "phone",
        numeric: true,
        disablePadding: false,
        label: "Phone",
    },
    {
        id: "point",
        numeric: true,
        disablePadding: false,
        label: "Point",
    },
    {
        id: "role",
        numeric: true,
        disablePadding: false,
        label: "Role",
    },
];
