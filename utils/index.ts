export const fetcher = (url: string): Promise<any> => fetch(url).then((r) => r.json())
