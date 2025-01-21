import { githubApi } from "../../api/github.Api"
import { sleep } from "../../helpers/sleep";
import { GithubIssue } from "../interfaces/issues.interface";

export const getIssue = async(issueNumber:number):Promise <GithubIssue> => {
    sleep(2500);
    //? tipamos con un arreglo de GithubIssues
    const {data} = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`)
  return data
}
