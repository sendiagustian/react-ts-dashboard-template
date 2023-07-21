import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./configs/ThemeConfig";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes />
        </ThemeProvider>
    );
}

export default App;
