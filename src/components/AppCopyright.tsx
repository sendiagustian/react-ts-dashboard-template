import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function AppCopyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
            {"Copyright © "}
            <Link color="inherit" href="/">
                Sendi Agustian
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
