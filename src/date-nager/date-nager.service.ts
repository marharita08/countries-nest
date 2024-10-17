import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

import { Country, CountryInfo } from 'src/types/types';

@Injectable()
export class DateNagerService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('DATE_NAGER_BASE_URL');
  }

  getAvailableCountries(): Observable<Country[]> {
    return this.httpService
      .get(`${this.apiUrl}AvailableCountries`)
      .pipe(map((response) => response.data));
  }

  getCountryInfo(countryCode: string): Observable<CountryInfo> {
    return this.httpService
      .get(`${this.apiUrl}CountryInfo/${countryCode}`)
      .pipe(map((response) => response.data));
  }
}
