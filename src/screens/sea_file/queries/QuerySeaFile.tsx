import axios, { AxiosRequestConfig } from "axios";

interface ReqBodyUploadFile {
    file: File;
    parent_dir: string;
    replace: 0 | 1;
}
export const uploadFile = async (resLink: string, reqBody: ReqBodyUploadFile): Promise<string | null> => {
    let result: string | null = null;

    const token: string = "fd44f519e43804f8f0f14880f4060898bfcdfe54";

    const reqHeader: AxiosRequestConfig = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    const formData = new FormData();
    formData.append("file", reqBody.file);
    formData.append("parent_dir", reqBody.parent_dir);
    formData.append("replace", reqBody.replace.toString());

    const url: string = "http://103.148.233.151:38082";
    const urlUpload: string = resLink.replace("https://seafile.protonema.co.id/seafhttp", url);

    axios.post(urlUpload, formData, reqHeader).then((resUpload) => {
        console.log(resUpload.data);
        result = resUpload.data;
    });

    return result;
};
