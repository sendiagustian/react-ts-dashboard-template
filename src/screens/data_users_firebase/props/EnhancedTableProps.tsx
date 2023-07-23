import { UserFirestoreModel } from "../../../models/UserFirestoreModel";
import { Order } from "../data/Order";

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserFirestoreModel) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
