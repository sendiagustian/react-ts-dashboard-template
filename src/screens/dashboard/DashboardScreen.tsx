import Stack from "@mui/material/Stack";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chart from "../../components/Chart";
import Paper from "@mui/material/Paper";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";

const DashboardScreen = () => {
    return (
        <Stack>
            <AppBreadcrumbs mainMenu="Dashboard" />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}
                        >
                            <Chart />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}
                        >
                            <Deposits />
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                            <Orders />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Stack>
    );
};

export default DashboardScreen;
