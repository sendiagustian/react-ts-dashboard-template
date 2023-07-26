import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export function searchBoxAction<T>(datas: Array<T>, searchInput: string, searchBy: keyof T): Array<T> {
    let searchResult: Array<T> = [];

    datas.forEach((data) => {
        const checkSearch: boolean = (data[searchBy] as string).toLowerCase().includes(searchInput.toLowerCase());
        if (checkSearch) {
            searchResult.push(data);
        }
    });

    return searchResult;
}

export default function SearchBoxTable<T>(props: {
    datas: Array<T>;
    searchValue: string;
    searchBy: keyof T;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<Array<any>>>;
    handleClickClose(): void;
}) {
    const datas: Array<any> = props.datas;
    const searchValue = props.searchValue;
    const searchBy = props.searchBy;
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
                const results: Array<any> = searchBoxAction(datas, e.currentTarget.value, searchBy);
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
