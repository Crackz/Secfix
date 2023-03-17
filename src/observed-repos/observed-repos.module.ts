import { Module } from '@nestjs/common';
import { FetcherModule } from 'src/fetcher/fetcher.module';
import { PrismaService } from 'src/prisma.service';
import { ObservedReposController } from './controller/observed-repos.controller';
import { ObservedReposService } from './service/observed-repos.service';

@Module({
  imports: [FetcherModule],
  controllers: [ObservedReposController],
  providers: [ObservedReposService, PrismaService],
  exports: [ObservedReposService],
})
export class ObservedReposModule {}
