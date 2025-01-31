import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

import { FlagInfo, PopulationInfo } from 'src/types/types';

@Injectable()
export class CountriesNowService {
  private readonly apiUrl: string;
  private readonly logger = new Logger(CountriesNowService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('COUNTRIES_NOW_BASE_URL');
  }

  getPopulationData(countryCode: string): Observable<PopulationInfo | null> {
    return this.handleResponse(
      this.httpService.post(`${this.apiUrl}countries/population`, {
        iso3: countryCode,
      }),
      countryCode,
      'Population',
    );
  }

  getFlagUrl(countryCode: string): Observable<FlagInfo | null> {
    return this.handleResponse<FlagInfo>(
      this.httpService.post(`${this.apiUrl}countries/flag/images`, {
        iso2: countryCode,
      }),
      countryCode,
      'Flag',
    );
  }

  private handleResponse<T>(
    request: Observable<any>,
    countryCode: string,
    property: string,
  ): Observable<T | null> {
    return request.pipe(
      map((response) => response.data.data),
      catchError((error) => {
        if (error.response?.status === HttpStatus.NOT_FOUND) {
          this.logger.warn(
            `${property} data for country code "${countryCode}" not found.`,
          );
          return of(null);
        }
        throw error;
      }),
    );
  }
}
