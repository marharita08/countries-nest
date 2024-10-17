import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CountriesNowService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('COUNTRIES_NOW_BASE_URL');
  }

  getPopulationData(countryCode: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .post(`${this.apiUrl}countries/population`, {iso3: countryCode})
      .pipe(map((response) => response.data));
  }

  getFlagUrl(countryCode: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .post(`${this.apiUrl}countries/flag/images`, {iso2: countryCode})
      .pipe(map((response) => response.data));
  }
}
