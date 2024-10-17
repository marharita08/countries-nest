import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DateNagerModule } from './date-nager/date-nager.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    DateNagerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
