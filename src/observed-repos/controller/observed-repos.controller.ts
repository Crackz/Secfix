import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ObservedRepo } from '@prisma/client';
import { CreateObservedRepoDto } from '../dto/create-observed-repo.dto';
import {
  GetAllObservedReposDto,
  GetAllObservedReposResponse,
} from '../dto/get-all-observed-repos.dto';
import { UpdateObservedRepoDto } from '../dto/update-observed-repo.dto';
import { ObservedReposService } from '../service/observed-repos.service';

@Controller('api/v1/observed-repos')
export class ObservedReposController {
  constructor(private readonly observedRepoService: ObservedReposService) {}

  @Get()
  async getAllObservedRepos(
    @Query() query: GetAllObservedReposDto,
  ): Promise<GetAllObservedReposResponse> {
    return this.observedRepoService.viewMany(query);
  }

  @Post()
  async createObservedRepo(
    @Body() body: CreateObservedRepoDto,
  ): Promise<ObservedRepo> {
    return this.observedRepoService.create(body);
  }

  @Get(':id')
  async getObservedRepo(@Param('id') id: string): Promise<ObservedRepo | null> {
    return this.observedRepoService.viewOne(id);
  }

  @Patch(':id')
  async updateObservedRepo(
    @Param('id') id: string,
    @Body() body: UpdateObservedRepoDto,
  ): Promise<ObservedRepo> {
    return this.observedRepoService.updateStatus(id, body);
  }

  @Delete(':id')
  async deleteObservedRepo(@Param('id') id: string): Promise<ObservedRepo> {
    return this.observedRepoService.delete(id);
  }
}
