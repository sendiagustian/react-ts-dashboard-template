import axios, { AxiosResponse } from "axios";
import { UserAPIModel } from "../../../models/UserAPIModel";
import { routePath } from "../../../routes/RouteMenuList";
import { NavigateFunction } from "react-router-dom";

export const getAllUsers = async () => {
    const listUsers: Array<UserAPIModel> = [];
    try {
        await axios
            .get("https://welcomed-perfectly-lacewing.ngrok-free.app/api/v1/users")
            .then((res: AxiosResponse<any, any>) => {
                const dataRes: Array<any> = res.data.data;
                dataRes.map((user) => {
                    listUsers.push({
                        id: user["userId"],
                        name: user["userName"],
                        email: user["userEmail"],
                        password: user["userPassword"],
                        gender: user["userGender"] == "L" ? "Laki-laki" : "Perempuan",
                    });
                });
            });
    } catch (error) {
        console.log(error);
    }
    return listUsers;
};

export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`https://welcomed-perfectly-lacewing.ngrok-free.app/api/v1/users/delete/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const addUser = async (
    navigate: NavigateFunction,
    userDataAdd: {
        userName: string;
        userEmail: string;
        userPassword: string;
        userGender: string;
    }
) => {
    try {
        await axios
            .post("https://welcomed-perfectly-lacewing.ngrok-free.app/api/v1/users/register", userDataAdd)
            .finally(() => navigate(routePath.dataUsersAPI));
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (
    id: number,
    navigate: NavigateFunction,
    userDataUpdate: {
        userName: string;
        userEmail: string;
        userPassword: string;
        userGender: string;
    }
) => {
    try {
        await axios
            .put(`https://welcomed-perfectly-lacewing.ngrok-free.app/api/v1/users/update/${id}`, userDataUpdate)
            .finally(() => navigate(routePath.dataUsersAPI));
    } catch (error) {
        console.log(error);
    }
};
