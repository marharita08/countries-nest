import { Injectable } from '@nestjs/common';
import { DateNagerService } from 'src/date-nager/date-nager.service';

@Injectable()
export class CountriesService {
  constructor(private readonly dateNagerService: DateNagerService) {}

  getAvailableCountries(): any {
    return this.dateNagerService.getAvailableCountries();
  }

  getCountryInfo(countryCode: string): any {
    return this.dateNagerService.getCountryInfo(countryCode);
  }
}
