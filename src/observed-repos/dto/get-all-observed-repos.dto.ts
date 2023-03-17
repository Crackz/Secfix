import { ObservedRepo } from '@prisma/client';

export class GetAllObservedReposDto {
  page: number;
  limit: number;
}

export class GetAllObservedReposResponse {
  page: number;
  limit: number;
  data: ObservedRepo[];
}
