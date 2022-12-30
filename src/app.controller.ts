import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Ind, Indicador } from '@interfaces';
import { AxiosResponse } from 'axios';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): string {
    return this.appService.health();
  }
  @Get('economics')
  economics(): Promise<AxiosResponse<Indicador>> {
    return this.appService.economics();
  }
  @Get('economics/:id')
  economicsId(@Param('id') id: string): Promise<AxiosResponse<Ind>> {
    return this.appService.economicsId(id);
  }
}
