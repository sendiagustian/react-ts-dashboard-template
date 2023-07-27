import axios, { AxiosRequestConfig } from "axios";

export const getToken = async (): Promise<string | null> => {
    let token: string | null = null;

    interface ReqBody {
        username: string;
        password: string;
    }

    const requestBody: ReqBody = {
        username: "protonema@protonema.co.id",
        password: "Kodokijo2023#",
    };

    axios.post("https://seafile.protonema.co.id/api2/auth-token", requestBody).then((res) => {
        console.log(res);
    });

    return token;
};

export const getUploadLink = async (): Promise<string | null> => {
    // const token: string | null = await getToken();
    const token: string = "fd44f519e43804f8f0f14880f4060898bfcdfe54k";
    let linkUpload: string | null = null;

    const reqHeader: AxiosRequestConfig = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    if (token !== null) {
        axios
            .get(
                "https://seafile.protonema.co.id/api2/repos/f037b658-bf74-4269-8ce4-b3c98fb2ca9e/upload-link/?p=/",
                reqHeader
            )
            .then((res) => {
                console.log(res.data.data);
                // linkUpload = res.data.data;
            });
    }

    return linkUpload;
};

interface ReqBodyUploadFile {
    file: File;
    parent_dir: string;
    replace: 0 | 1;
}
export const uploadFile = async (reqBody: ReqBodyUploadFile): Promise<string | null> => {
    const token: string | null = await getToken();
    const linkUpload = await getUploadLink();

    let result: string | null = null;

    const reqHeader: AxiosRequestConfig = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    if (linkUpload !== null) {
        axios.post(linkUpload, reqBody, reqHeader).then((res) => {
            console.log(res.data.data);
            // linkUpload = res.data.data;
        });
    }
    return result;
};
