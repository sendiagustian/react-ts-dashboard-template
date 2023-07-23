import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useMemo, useState } from "react";
import { UserFirestoreModel } from "../../models/UserFirestoreModel";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { routeAddDataUsersFirebase, routeUpdateDataUsersFirebase } from "../../routes/AppRoutes";
import { headCells } from "./data/HeadCell";
import { EnhancedTableProps } from "./props/EnhancedTableProps";
import { Order } from "./data/Order";
import LoadingScreen from "../../components/LoadingScreen";
import SearchBoxTable from "../../components/SearchBoxTable";
import AppDialog from "../../components/AppDialog";
import { deleteUser, getDataUsers } from "./queries/QueryUsersFirestore";
import { EnhancedTableToolbarProps } from "./props/EnhancedTableToolbarProps";

export default function DataUsersFirestoreScreen() {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof UserFirestoreModel>("name");
    const [dense, setDense] = useState<boolean>(false);
    const [onLoad, setLoad] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [rows, setRows] = useState<Array<UserFirestoreModel>>([]);
    const [userDataSelected, setUserDataSelected] = useState<UserFirestoreModel>();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [loadingDialog, setLoadingDialog] = useState<boolean>(false);
    const [searchResults, setSearchResult] = useState<Array<UserFirestoreModel>>([]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const navigate = useNavigate();

    useEffect(() => {
        setLoad(true);
        getDataUsers()
            .then((docs) => setRows(docs))
            .finally(() => setLoad(false));
    }, []);

    const visibleRows = useMemo(() => {
        if (search != "" && search.length > 3) {
            return searchResults;
        } else {
            return stableSort<UserFirestoreModel>(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            );
        }
    }, [rows, order, orderBy, page, rowsPerPage, search, searchResults]);

    const refreshData = async () => {
        getDataUsers().then((docs) => setRows(docs));
        setSelected([]);
    };

    const handleAddButton = (url: string) => {
        return () => {
            navigate(url);
        };
    };

    const handleClickClose = () => {
        setSearch("");
    };

    const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof UserFirestoreModel) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = visibleRows.map((n) => n.docUid);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClickRow = (_event: React.MouseEvent<unknown>, docUid: string) => {
        const selectedIndex = selected.indexOf(docUid);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, docUid);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (docUid: string) => selected.indexOf(docUid) !== -1;

    const handleDeletedOk = async () => {
        setLoadingDialog(true);
        if (selected.length == 1 && userDataSelected != null) {
            deleteUser(userDataSelected.docUid).finally(() => {
                setLoadingDialog(false);
                setOpenDialog(false);
                refreshData();
                setSearch("");
            });
        } else {
            if (selected.length > 0) {
                let deletedProgress = 0;
                selected.forEach(async (uid) => {
                    deletedProgress++;
                    deleteUser(uid).finally(() => {
                        if (selected.length == deletedProgress) {
                            refreshData().finally(() => {
                                setLoadingDialog(false);
                                setOpenDialog(false);
                            });
                            setSearch("");
                        }
                    });
                });
            }
        }
    };

    if (onLoad) {
        return <LoadingScreen />;
    } else {
        return (
            <Box sx={{ width: "100%" }}>
                <AppBreadcrumbs mainMenu="DataUsersFb" />
                <Stack direction="row" sx={{ mb: 2 }} justifyItems="end">
                    <Button
                        variant="contained"
                        onClick={handleAddButton(routeAddDataUsersFirebase)}
                        sx={{ width: 200 }}
                    >
                        Add Users
                    </Button>
                    <Box sx={{ width: "100%" }} />
                    <FormControlLabel
                        label="Dense padding:"
                        labelPlacement="start"
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        sx={{ width: 300 }}
                    />
                </Stack>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        userData={userDataSelected}
                        open={openDialog}
                        setOpen={setOpenDialog}
                        setSelected={setSelected}
                        children={
                            <SearchBoxTable
                                datas={rows}
                                searchValue={search}
                                setSearch={setSearch}
                                setResult={setSearchResult}
                                handleClickClose={handleClickClose}
                            />
                        }
                    />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={visibleRows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.docUid);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            key={index}
                                            hover
                                            onClick={(event) => {
                                                setUserDataSelected(row);
                                                handleClickRow(event, row.docUid);
                                            }}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.appName}</TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">{row.point}</TableCell>
                                            <TableCell align="right">{row.role}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <AppDialog
                        open={openDialog}
                        title="Delete selected item?"
                        content="Data ini akan terhapus selamanya."
                        loading={loadingDialog}
                        handleClose={() => setOpenDialog(false)}
                        handleOk={handleDeletedOk}
                    />
                </Paper>
            </Box>
        );
    }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof UserFirestoreModel>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: string | number }, b: { [key in Key]: string | number }) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof UserFirestoreModel) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const navigate = useNavigate();
    const numSelected = props.numSelected;
    const children = props.children;
    const userData = props.userData;
    const setOpen = props.setOpen;
    const setSelected = props.setSelected;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                children
            )}
            {numSelected > 1 ? (
                <Stack direction="row">
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleClickDeleteAllSelected(setOpen)} sx={{ color: "red" }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear Selected">
                        <IconButton onClick={() => handleClickClearSelected(setSelected)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ) : numSelected == 1 ? (
                <Stack direction="row">
                    <Tooltip title="Edit">
                        <IconButton onClick={() => (userData ? handleClickEdit(userData, navigate) : null)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleClickDelete(setOpen)} sx={{ color: "red" }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear Selected">
                        <IconButton onClick={() => handleClickClearSelected(setSelected)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ) : (
                <></>
            )}
        </Toolbar>
    );
}

function handleClickEdit(userData: UserFirestoreModel, navigate: NavigateFunction) {
    navigate(routeUpdateDataUsersFirebase, { state: userData });
}

function handleClickDelete(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    setOpen(true);
}

function handleClickClearSelected(setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>) {
    setSelected([]);
}

function handleClickDeleteAllSelected(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    setOpen(true);
}
