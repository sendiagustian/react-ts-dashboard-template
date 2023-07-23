import { UserFirestoreModel } from "../../../models/UserFirestoreModel";

export interface EnhancedTableToolbarProps {
    numSelected: number;
    children: JSX.Element;
    userData?: UserFirestoreModel;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
}
