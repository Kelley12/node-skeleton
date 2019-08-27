
const statusRej = (res: Response) => Promise.reject(new Error(`Error: ${res.status}`));

const jsonHeader = new Headers();
jsonHeader.append("Content-Type", "application/json");

export async function getJSON(uri: string): Promise<any> {
    const req = new Request(uri);
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
    return res.json();
}

export async function putJSON(uri: string, body: any): Promise<void> {
    const req = new Request(uri, {
        method: "PUT", body: JSON.stringify(body), headers: jsonHeader
    });
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
}

export async function del(uri: string): Promise<void> {
    const req = new Request(uri, { method: "DELETE" });
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
}

export async function post<T = any>(uri: string, body?: any): Promise<T> {
    const req = new Request(uri, {
        method: "POST", body: JSON.stringify(body), headers: jsonHeader
    });
    const res = await fetch(req);
    if (res.status !== 200) return statusRej(res);
    return res.json().catch(_ => undefined);
}
