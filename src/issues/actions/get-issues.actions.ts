import { githubApi } from "../../api/github.Api"
import { sleep } from "../../helpers/sleep";
import { GithubIssue } from "../interfaces/issues.interface";

export const getIssues = async():Promise <GithubIssue[]> => {
    sleep(1500);
    //? tipamos con un arreglo de GithubIssues
    const {data} = await githubApi.get<GithubIssue[]>('/issues')

  return data
}
