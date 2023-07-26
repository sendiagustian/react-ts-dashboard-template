import axios from "axios";
import encode from "jwt-encode";

interface ReqLogin {
    email: string;
    password: string;
}

export const loginUser = async (request: ReqLogin): Promise<string | null> => {
    let token: string | null = null;
    try {
        await axios
            .put("https://welcomed-perfectly-lacewing.ngrok-free.app/api/v1/users/login", request)
            .then((res) => {
                token = encode(res.data.data, "screet");
            });
    } catch (error) {
        console.log(error);
    }

    return token;
};
