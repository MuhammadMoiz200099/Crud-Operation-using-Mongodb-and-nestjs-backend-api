import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import l, { logger } from 'src/server/common/logger';
import { generateJsonResponse, manageError } from 'src/server/helper/response.helper';
import { CarService } from './car.service';

@Controller('car')
export class CarController {

    constructor(private carService: CarService) { }

    @Get()
    public async getCars(@Req() req: Request, @Res() res: Response) {
        try {
            const request = await this.carService.getCars(req.query);
            generateJsonResponse(res, request, 200, 'Cars fetched')
        }
        catch (error) {
            const err = manageError(error);
            generateJsonResponse(res, '', err.code, err.message);
        }
    }

    @Post()
    public async insertCar(@Req() req: Request, @Res() res: Response) {
        try {
            const request = await this.carService.insertCar(req.body);
            generateJsonResponse(res, request, 200, 'Successfully Inserted Record');
        }
        catch (error) {
            const err = manageError(error);
            generateJsonResponse(res, '', err.code, err.message);
        }
    }

    @Get(':id')
    public async getCarById(@Req() req: Request, @Res() res: Response) {
        try {
            const request = await this.carService.getCarByID(req.params.id);
            generateJsonResponse(res, request, 200, 'Record Fetched');
        }
        catch (error) {
            const err = manageError(error);
            generateJsonResponse(res, '', err.code, err.message);
        }
    }

    @Put(":id")
    public async updateCarByID(@Req() req: Request, @Res() res: Response) {
        try {
            const request = await this.carService.updateCarByID(req.params.id, req.body);
            generateJsonResponse(res, request, 200, 'Successfully Updated Record');
        }
        catch (error) {
            const err = manageError(error);
            generateJsonResponse(res, '', err.code, err.message);
        }
    }

    @Delete(':id')
    public async deleteCarByID(@Req() req: Request, @Res() res: Response) {
        try {
            const request = await this.carService.deleteCarByID(req.params.id);
            generateJsonResponse(res, request, 200, 'Successfully Delete Record');
        }
        catch (error) {
            const err = manageError(error);
            generateJsonResponse(res, '', err.code, err.message);
        }
    }

}
