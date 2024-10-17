import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Country, CountryFullInfo } from 'src/types/types';

import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  getAvailableCountries(): Observable<Country[]> {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':code')
  getCountryInfo(@Param('code') code: string): Observable<CountryFullInfo> {
    return this.countriesService.getCountryInfo(code);
  }
}
