
import { Document } from 'mongoose';

export interface ICarsDataPayload extends IQueryOptions {
    rows: Array<ICarsPayload>
}

export interface ICarsPayload {
    id?: string;
    name: string;
    brand: string;
    color: string;
    carModel: string;
    year: string;
    isUsed: boolean;
}

export interface ICarsResponsePayload {
    rows: Array<ICarsPayload>;
    total_records: number;
    message: string;
}

export interface ICar extends Document {
    _id?: string;
    name: string;
    brand: string;
    color: string;
    carModel: string;
    year: string;
    isUsed: boolean;
}

export interface IQueryOptions {
    limit?: number;
    offset?: number;
    search?: string;
    total_size?: number;
}

export interface CarDeleteResponse extends CarDeleteCount  {
    ok?: number;
    n?: number;
} 

export interface CarDeleteCount {
    deletedCount?: number;
}