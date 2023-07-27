import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import { useEffect, useState } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { Autocomplete, Box, FormLabel, List, ListItemButton, ListSubheader, Stack, TextField } from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { CustomerModel } from "./data/CustomerModel";

export default function MapsScreen() {
    const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const authToken: string = import.meta.env.VITE_TOKEN;
    const withPanelMaps: number = 300;
    const heightScreen: string = "75.5vh";

    const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });
    const { openSideMenu, drawerWidth } = useGlobal();

    const [rowCustomers, setRowCustomers] = useState<Array<CustomerModel>>([]);

    useEffect(() => {
        axios
            .get("https://api-dev-paradina.quatronema.co.id/api/v1/customer/all", {
                headers: {
                    Authorization: authToken,
                },
            })
            .then((res) => {
                let results: Array<CustomerModel> = [];
                let countDataAdded = 0;
                const customers: Array<any> = res.data.data;
                customers.forEach((customer) => {
                    results.push(new CustomerModel(customer));
                    countDataAdded++;
                });
                if (customers.length === countDataAdded) {
                    setRowCustomers(results);
                }
            });
    }, []);

    const containerStyle = {
        width: openSideMenu ? `calc(95vw - ${drawerWidth + withPanelMaps}px)` : `calc(91vw - ${withPanelMaps}px)`,
        height: "83vh",
    };

    const center = {
        lat: -7.2678129,
        lng: 112.7278907,
    };

    if (!isLoaded) {
        return <LoadingScreen />;
    } else {
        return (
            <Stack direction="row">
                <Box height={heightScreen} width={withPanelMaps} sx={{ mr: 3 }}>
                    <FormLabel sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                        <Autocomplete
                            disablePortal
                            id="role-user"
                            options={[]}
                            fullWidth={true}
                            size="small"
                            // value={role}
                            // onChange={(_e, values) => (values ? setRole(values) : null)}
                            renderInput={(params) => <TextField placeholder="Select Site" {...params} />}
                        />
                    </FormLabel>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: heightScreen,
                            "& ul": { padding: 0 },
                        }}
                        subheader={<li />}
                    >
                        <ListSubheader>Data Customer by Site</ListSubheader>
                        {rowCustomers.map((customer) => {
                            return <ListItemButton key={customer.storeUid}>{customer.storeName}</ListItemButton>;
                        })}
                    </List>
                </Box>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                    {rowCustomers.map((customer) => {
                        return (
                            <Marker
                                icon={{
                                    url: "https://firebasestorage.googleapis.com/v0/b/paradina-53e7e.appspot.com/o/markers%2Fpet_shop_marker_besar.png?alt=media&token=4553375d-d530-4905-b618-00f551ae34c1",
                                    scaledSize: new google.maps.Size(30, 46),
                                }}
                                key={customer.storeUid}
                                position={{
                                    lat: Number(customer.latitude),
                                    lng: Number(customer.longitude),
                                }}
                            ></Marker>
                        );
                    })}
                </GoogleMap>
            </Stack>
        );
    }
}
