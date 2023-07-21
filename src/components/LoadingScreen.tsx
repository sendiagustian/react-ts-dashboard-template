import { Container, CircularProgress } from "@mui/material";

function LoadingScreen({ height = "calc(100vh - 196px)" }) {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
        </Container>
    );
}

export default LoadingScreen;
