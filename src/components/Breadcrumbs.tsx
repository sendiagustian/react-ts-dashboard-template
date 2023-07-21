import slugify from "react-slugify";

import { toPascalCase } from "../utils/ConvertString";
import { useLocation, useNavigate } from "react-router-dom";
import { removeFromRight } from "../utils/ArrayRemove";
import { Breadcrumbs, Button, Typography } from "@mui/material";

function AppBreadcrumbs(props: { mainMenu: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const breadcrumbs: Array<string> = location.pathname.split("/");
    breadcrumbs[0] = props.mainMenu;

    function handleClick(item: string) {
        return () => {
            const url: string = `/${removeFromRight(breadcrumbs, slugify(item)).join("/")}`;
            navigate(url);
        };
    }

    if (breadcrumbs.length == 2) {
        return <Typography sx={{ marginBottom: 3 }}>{props.mainMenu}</Typography>;
    } else {
        breadcrumbs.shift();
        return (
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                {breadcrumbs.map((item, index) =>
                    index == breadcrumbs.length - 1 ? (
                        <Typography key={item} color="text.primary">
                            {toPascalCase(item)}
                        </Typography>
                    ) : (
                        <Button
                            key={item}
                            variant="text"
                            onClick={handleClick(item)}
                            sx={{ textTransform: "capitalize" }}
                        >
                            <Typography key={item} color="text.primary">
                                {toPascalCase(item)}
                            </Typography>
                        </Button>
                    )
                )}
            </Breadcrumbs>
        );
    }
}

export default AppBreadcrumbs;
