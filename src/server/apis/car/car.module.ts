import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';

import { MongooseModule } from "@nestjs/mongoose";
import { CAR_SCHEMA } from 'src/server/schemas/car/car.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Car',
        schema: CAR_SCHEMA
      }
    ])
  ],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
