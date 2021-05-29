import { HttpException, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from '../../interfaces/car/car.interface';
import { ICarsDataPayload, ICarsPayload, IQueryOptions } from 'src/type/car/car';
import { of } from 'rxjs';

const carProjection = {
    __v: false
}

@Injectable()
export class CarService {

    constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

    public async getCars(queryOptions?: IQueryOptions): Promise<ICarsDataPayload> {
        let records: ICar[] = []; 
        if(queryOptions.search) {
            records = await this.carModel.find(
                { name: {$regex: `.*${queryOptions.search}.*` }}, 
                carProjection, {}, 
                (err,doc) => doc 
            )
            .skip(+queryOptions?.offset)
            .limit(+queryOptions?.limit)
            .exec();
        } else {
            records = await this.carModel.find({}, carProjection)
            .skip(+queryOptions?.offset)
            .limit(+queryOptions?.limit)
            .exec();
        }

        if(!records || !records[0]) {
            throw new HttpException('Record not found!', 404);
        }

        const response: ICarsDataPayload = {
            rows: records,
            offset: +queryOptions?.offset || 0,
            limit: +queryOptions?.limit || 10,
            total_size: (await this.carModel.find()).length
        }

        return response;
    }

    public async getCarByID(_id: string): Promise<ICarsPayload> {
        const record = await this.carModel.findOne({ _id }, carProjection).exec();
         if(!record) {
            throw new HttpException(`Record aganist {id: ${_id}} not found!`, 404);
        }
        return record;
    }

    public async insertCar(car: ICarsPayload): Promise<ICarsPayload> {
        const record = await new this.carModel(car);
        return record.save();   
    }

    public async updateCarByID(_id: string, car: ICarsPayload): Promise<ICarsPayload> {
        const record = await this.carModel.findOneAndUpdate({ _id }, { ...car }, {}).exec();
        if(!record) {
            throw new HttpException(`Record aganist {id: ${_id}} not found!`, 404);
        }
        return record;
    }

    public async deleteCarByID(_id: string) {
        const record = await this.carModel.deleteOne({ _id }).exec();
        if(record.deletedCount === 0) {
            throw new HttpException(`Record aganist {id: ${_id}} not found!`, 404);
        }
        return record;
    }

}
