import { IsString } from 'class-validator';

export class CreateObservedRepoDto {
  @IsString()
  username: string;

  @IsString()
  repoName: string;
}
