import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";

export function searchBoxAction(datas: Array<any>, searchInput: string): Array<any> {
    let searchResult: Array<any> = [];

    datas.forEach((data) => {
        (Object.keys(data) as (keyof typeof data)[]).find((key) => {
            const checkSearch: boolean = data[key].toString().toLowerCase().includes(searchInput);
            if (checkSearch) {
                searchResult.push(data);
            }
        });
    });
    return searchResult;
}

export default function SearchBoxTable(props: {
    datas: Array<any>;
    searchValue: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleClickClose: () => void;
    setResult: React.Dispatch<React.SetStateAction<Array<any>>>;
}) {
    const datas: Array<any> = props.datas;
    const searchValue = props.searchValue;
    const setSearch = props.setSearch;
    const setResult = props.setResult;
    const handleClickClose = props.handleClickClose;

    return (
        <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            size="small"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {
                setSearch(e.currentTarget.value);
                const results: Array<any> = searchBoxAction(datas, searchValue);
                setResult(results);
            }}
            sx={{ width: 300 }}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            endAdornment={
                searchValue.length > 0 ? (
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickClose} edge="end">
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                ) : null
            }
        />
    );
}
