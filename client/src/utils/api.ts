import { IRange } from './types'

let __range: IRange = null

export const setTimeRange = (range: IRange) => {
    __range = range
}

export const fetchLogs = async () => {
    console.log(__range)
    if (__range) {
        return request("/api/logs?start_unix=" + __range[0].unix() + "&end_unix=" + __range[1].unix())
    }
    return request("/api/logs")
}

export const fetchStats = async () => {
    if (__range) {
        return request("/api/stats?start_unix=" + __range[0].unix() + "&end_unix=" + __range[1].unix())
    }
    return request("/api/stats")
}

export const request = async (path: string, opts?: RequestInit) => {
    let url = import.meta.env.VITE_API_URL + path;
    url = url.replace(/([^:]\/)\/+/g, "$1");
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json();
    return data;
}
