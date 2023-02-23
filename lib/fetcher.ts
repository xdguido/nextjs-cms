class FetchError extends Error {
    constructor(public readonly status: number, message?: string) {
        super(message);
        this.name = 'FetchError';
    }
}

async function parseResponse(res: Response): Promise<any> {
    const contentType = res.headers.get('Content-Type');
    if (contentType?.startsWith('application/json')) {
        return res.json();
    } else if (contentType?.startsWith('text/')) {
        return res.text();
    } else {
        return res.blob();
    }
}

export default async function fetcher(url: string) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(timeoutId);

    if (!res.ok) {
        const message = res.statusText;
        throw new FetchError(res.status, message);
    }

    return parseResponse(res);
}
