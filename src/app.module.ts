import { Module } from '@nestjs/common';
import { CarModule } from './server/apis/car/car.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CarModule,
    MongooseModule.forRoot('mongodb://localhost/cars_showroom'),
  ],
})
export class AppModule {}
