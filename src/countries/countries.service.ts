import { Injectable } from '@nestjs/common';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DateNagerService } from 'src/date-nager/date-nager.service';
import { CountriesNowService } from 'src/countries-now/countries-now.service';

@Injectable()
export class CountriesService {
  constructor(private readonly dateNagerService: DateNagerService, private readonly countriesNowService: CountriesNowService) {}

  getAvailableCountries(): Observable<any> {
    return this.dateNagerService.getAvailableCountries();
  }

  getCountryInfo(countryCode: string): Observable<any> {
    return forkJoin({
      countryInfo: this.dateNagerService.getCountryInfo(countryCode),
      flagUrl: this.countriesNowService.getFlagUrl(countryCode)
    }).pipe(
      switchMap(({ countryInfo, flagUrl }) => {
        return this.countriesNowService.getPopulationData(flagUrl.data.iso3).pipe(
          map((population) => ({
            ...countryInfo,
            flagUrl,
            population
          }))
        );
      })
    );
  }
}
