export function removeFromRight(datas: Array<string>, id: string): Array<string> {
    const idKeep = datas.indexOf(id);
    const last = datas.length - 1;

    datas.splice(idKeep + 1, last);
    return datas;
}
