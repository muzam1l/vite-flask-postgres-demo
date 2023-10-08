import { Dayjs } from 'dayjs';

export type ILogs = Array<{
    id: number;
    timestamp: number;
    user_id: string;
    status: string;
    error_message: string;
    request: string;
    response: string;
}>

export type IStats = {
    total_calls: number;
    total_failures: number;
    total_users: number;
};

export type IRange = [Dayjs, Dayjs] | null