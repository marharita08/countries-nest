import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DateNagerService } from './date-nager.service';

@Module({
  imports: [HttpModule],
  providers: [DateNagerService],
  exports: [DateNagerService],
})
export class DateNagerModule {}
