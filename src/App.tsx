import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./configs/ThemeConfig";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalContextProvider>
                <AppRoutes />
            </GlobalContextProvider>
        </ThemeProvider>
    );
}

export default App;
