import { Logger, Module } from '@nestjs/common';
import { FetcherModule } from 'src/fetcher/fetcher.module';
import { ObservedReposModule } from 'src/observed-repos/observed-repos.module';
import { PrismaService } from 'src/prisma.service';
import { CronService } from './cron.service';

@Module({
  imports: [FetcherModule, ObservedReposModule],
  controllers: [],
  providers: [CronService, PrismaService, Logger],
})
export class CronModule {}
