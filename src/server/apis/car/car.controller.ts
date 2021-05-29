import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { generateJsonResponse, manageError } from 'src/server/helper/response.helper';
import { CarService } from './car.service';

@Controller('car')
export class CarController {

    constructor(private carService: CarService) {}

    @Get()
    public getCars(@Req() req: Request, @Res() res: Response) {
        this.carService.getCars(req.query).then(
            (cars) => generateJsonResponse(res, cars, 200, 'Cars fetched')),
            ((error) => {
                const err = manageError(error);
                generateJsonResponse(res, '', err.code, err.message);
              }
        );
    }

    @Post()
    public insertCar(@Req() req: Request, @Res() res: Response) {
        this.carService.insertCar(req.body).then(
            (cars) => generateJsonResponse(res, cars, 200, 'Successfully Inserted Record')),
            ((error) => {
                const err = manageError(error);
                generateJsonResponse(res, '', err.code, err.message);
              }
        );;
    }

    @Get(':id')
    public getCarById(@Req() req: Request, @Res() res: Response) {
        this.carService.getCarByID(req.params.id).then(
            (cars) => generateJsonResponse(res, cars, 200, 'Record Fetched')),
            ((error) => {
                const err = manageError(error);
                generateJsonResponse(res, '', err.code, err.message);
              }
        );;
    }

    @Put(":id")
    public updateCarByID(@Req() req: Request, @Res() res: Response) {
        this.carService.updateCarByID(req.params.id, req.body).then(
            (cars) => generateJsonResponse(res, cars, 200, 'Successfully Updated Record')),
            ((error) => {
                const err = manageError(error);
                generateJsonResponse(res, '', err.code, err.message);
              }
        );
    }

    @Delete(':id')
    public deleteCarByID(@Req() req: Request, @Res() res: Response) {
        this.carService.deleteCarByID(req.params.id).then(
            (cars) => generateJsonResponse(res, cars, 200, 'Successfully Delete Record')),
            ((error) => {
                const err = manageError(error);
                generateJsonResponse(res, '', err.code, err.message);
              }
        );
    }

}
