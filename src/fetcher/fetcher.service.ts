import { Injectable } from '@nestjs/common';
import { Endpoints } from '@octokit/types';
import { Octokit } from 'octokit';
import { GithubResponseDto } from './interfaces/github-response.dto';

export type GetGithubRepoResponse =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

@Injectable()
export class FetcherService {
  private readonly octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,
  });

  async getGithubRepo(owner: string, name: string): Promise<GithubResponseDto> {
    const githubRepoDetails = (await this.octokit.request(
      `GET /repos/${owner}/${name}`,
      {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )) as any;

    return {
      owner,
      name,
      stars: githubRepoDetails.data.stargazers_count,
      openIssues: githubRepoDetails.data.open_issues_count,
      license: githubRepoDetails.data.license?.key ?? '',
      url: githubRepoDetails.url,
    };
  }
}
