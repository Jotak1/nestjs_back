import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}
  health(): string {
    return 'OK!';
  }
  async economics(): Promise<AxiosResponse<any>> {
    const { data } = await firstValueFrom(
      this.httpService.get('https://mindicador.cl/api').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new Error('Error');
        }),
      ),
    );
    return data;
  }
  async economicsId(id: string): Promise<AxiosResponse<any>> {
    console.log('id', id);
    const { data } = await firstValueFrom(
      this.httpService.get(`https://mindicador.cl/api/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new Error('Error');
        }),
      ),
    );
    return data;
  }
}
