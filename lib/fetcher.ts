export default async function fetcher(url: string) {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error(await res.text());
        throw error;
    }

    return res.json();
}
