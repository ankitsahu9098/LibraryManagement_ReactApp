
export async function get<TResult>(url: string){
    return await request<TResult>('GET', url);
}

async function request<TResult>(method: string, url: string,body?: unknown){
    const response = await fetch('https://localhost:7007/api/master' + url, {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            Origin: window.location.host,
            'Content-Type': 'application/json charset=UTF-8',
        },
    });

    const json = await response.json();

    return json as TResult;
}