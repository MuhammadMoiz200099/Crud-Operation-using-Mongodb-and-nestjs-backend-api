import { Document } from 'mongoose';

export interface ICar extends Document {
    _id?: string;
    name: string;
    brand: string;
    color: string;
    carModel: string;
    year: string;
    isUsed: boolean;
}
