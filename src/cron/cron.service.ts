import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FetcherService } from 'src/fetcher/fetcher.service';
import { ObservedRepoStatus } from 'src/observed-repos/interfaces/observed-repo-status';
import { ObservedReposService } from 'src/observed-repos/service/observed-repos.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger('CronService');

  constructor(
    private readonly observedRepoService: ObservedReposService,
    private readonly fetcherService: FetcherService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('CRON IS STARTED');

    const repos = await this.observedRepoService.findMany({
      status: ObservedRepoStatus.ACTIVE,
    });
    if (repos.length === 0) {
      this.logger.debug('No Repos With Active Status');
      return;
    }

    await Promise.all(
      repos.map(async (repo) => {
        const githubRepoDetails = await this.fetcherService.getGithubRepo(
          repo.owner,
          repo.name,
        );

        this.observedRepoService.patch(repo.id, githubRepoDetails);
      }),
    );

    this.logger.debug('Updated Repos: ' + repos.map((repo) => repo.name));
  }
}
