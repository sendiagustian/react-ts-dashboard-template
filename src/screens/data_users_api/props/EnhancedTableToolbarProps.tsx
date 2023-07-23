import { UserAPIModel } from "../../../models/UserAPIModel";

export interface EnhancedTableToolbarProps {
    numSelected: number;
    children: JSX.Element;
    userData?: UserAPIModel;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
}
