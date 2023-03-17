import { IsEnum } from 'class-validator';
import { ObservedRepoStatus } from '../interfaces/observed-repo-status';

export class UpdateObservedRepoDto {
  @IsEnum(ObservedRepoStatus)
  status: ObservedRepoStatus;
}
