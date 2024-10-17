import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  getAvailableCountries(): any {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':code')
  getCountryInfo(@Param('code') code: string): any {
    return this.countriesService.getCountryInfo(code);
  }
}
