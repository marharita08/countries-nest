import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesNowService } from './countries-now.service';

@Module({
  imports: [HttpModule],
  providers: [CountriesNowService],
  exports: [CountriesNowService],
})
export class CountriesNowModule {}
