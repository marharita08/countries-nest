import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

import { FlagInfo, PopulationInfo } from 'src/types/types';

@Injectable()
export class CountriesNowService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('COUNTRIES_NOW_BASE_URL');
  }

  getPopulationData(countryCode: string): Observable<PopulationInfo> {
    return this.httpService
      .post(`${this.apiUrl}countries/population`, { iso3: countryCode })
      .pipe(map((response) => response.data.data));
  }

  getFlagUrl(countryCode: string): Observable<FlagInfo> {
    return this.httpService
      .post(`${this.apiUrl}countries/flag/images`, { iso2: countryCode })
      .pipe(map((response) => response.data.data));
  }
}
