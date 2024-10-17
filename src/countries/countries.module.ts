import { Module } from '@nestjs/common';

import { DateNagerModule } from 'src/date-nager/date-nager.module';
import { CountriesNowModule } from 'src/countries-now/countries-now.module';

import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  imports: [DateNagerModule, CountriesNowModule],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}
