import { Injectable, NotFoundException } from '@nestjs/common';
import { ObservedRepo } from '@prisma/client';
import { FetcherService } from 'src/fetcher/fetcher.service';
import { PrismaService } from '../../prisma.service';
import { CreateObservedRepoDto } from '../dto/create-observed-repo.dto';
import {
  GetAllObservedReposDto,
  GetAllObservedReposResponse,
} from '../dto/get-all-observed-repos.dto';
import { UpdateObservedRepoDto } from '../dto/update-observed-repo.dto';
import { ObservedRepoStatus } from '../interfaces/observed-repo-status';

@Injectable()
export class ObservedReposService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fetcher: FetcherService,
  ) {}

  private async checkExist(id: string): Promise<ObservedRepo> {
    const observedRepo = await this.prisma.observedRepo.findFirst({
      where: { id },
    });

    if (!observedRepo) {
      throw new NotFoundException();
    }

    return observedRepo;
  }

  async findMany(filterQuery?: {
    status?: ObservedRepoStatus;
  }): Promise<ObservedRepo[]> {
    return await this.prisma.observedRepo.findMany({
      where: filterQuery,
    });
  }

  async viewMany(
    query: GetAllObservedReposDto,
  ): Promise<GetAllObservedReposResponse> {
    query.limit = +query.limit || 1;
    query.page = +query.page || 1;

    const observedRepos = await this.prisma.observedRepo.findMany({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return {
      limit: query.limit,
      page: query.page,
      data: observedRepos,
    };
  }

  async viewOne(id: string): Promise<ObservedRepo> {
    return await this.checkExist(id);
  }

  async create(
    createObservedRepoDto: CreateObservedRepoDto,
  ): Promise<ObservedRepo> {
    const githubRepoDetails = await this.fetcher.getGithubRepo(
      createObservedRepoDto.username,
      createObservedRepoDto.repoName,
    );

    return this.prisma.observedRepo.create({
      data: {
        ...githubRepoDetails,
      },
    });
  }

  async patch(
    id: string,
    updatableObservedRepo: Partial<Omit<ObservedRepo, 'id'>>,
  ): Promise<ObservedRepo> {
    return await this.prisma.observedRepo.update({
      data: { ...updatableObservedRepo },
      where: { id },
    });
  }

  async updateStatus(
    id: string,
    updateObservedRepoDto: UpdateObservedRepoDto,
  ): Promise<ObservedRepo> {
    await this.checkExist(id);
    return await this.patch(id, updateObservedRepoDto);
  }

  async delete(id: string): Promise<ObservedRepo> {
    await this.checkExist(id);

    return await this.prisma.observedRepo.delete({
      where: { id },
    });
  }
}
