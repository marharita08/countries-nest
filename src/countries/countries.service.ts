import { Injectable } from '@nestjs/common';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DateNagerService } from 'src/date-nager/date-nager.service';
import { CountriesNowService } from 'src/countries-now/countries-now.service';
import { Country, CountryFullInfo } from 'src/types/types';

@Injectable()
export class CountriesService {
  constructor(
    private readonly dateNagerService: DateNagerService,
    private readonly countriesNowService: CountriesNowService,
  ) {}

  getAvailableCountries(): Observable<Country[]> {
    return this.dateNagerService.getAvailableCountries();
  }

  getCountryInfo(countryCode: string): Observable<CountryFullInfo> {
    return forkJoin({
      countryInfo: this.dateNagerService.getCountryInfo(countryCode),
      flag: this.countriesNowService.getFlagUrl(countryCode),
    }).pipe(
      switchMap(({ countryInfo, flag }) => {
        if (!flag) {
          return of({
            ...countryInfo,
            flagUrl: null,
            population: null,
          });
        }

        return this.countriesNowService.getPopulationData(flag.iso3).pipe(
          map((population) => ({
            ...countryInfo,
            flagUrl: flag.flag,
            population: population.populationCounts,
          })),
        );
      }),
    );
  }
}
