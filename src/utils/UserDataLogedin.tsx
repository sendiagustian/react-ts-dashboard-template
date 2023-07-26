import decode from "jwt-decode";
import { UserAPIModel } from "../models/UserAPIModel";

export function getUserLogedin(): UserAPIModel | null {
    const token: string | null = localStorage.getItem("key-token");
    const decoded: any = token ? decode(token) : null;
    if (decoded != null) {
        const userData: UserAPIModel = {
            id: decoded.userId,
            name: decoded.userName,
            email: decoded.userEmail,
            password: decoded.userPassword,
            gender: decoded.userGender,
        };

        return userData;
    } else {
        return null;
    }
}
