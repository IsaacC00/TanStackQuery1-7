import { githubApi } from "../../api/github.Api"
import { sleep } from "../../helpers/sleep";
import { GithubIssue, State } from "../interfaces/issues.interface";

export const getIssuesState = async(state:State,selectedLabels:string[]):Promise <GithubIssue[]> => {
    sleep(1500);

    const params = new URLSearchParams();

    //? preguntamos si params es diferente de All
    //? para guardar close u open en params
    if (state !== State.All) {
      params.append('state',state);
    }

    //? si selectedLabels es > 0 entonces lo separamos con uan coma y 
    //? los agregamos a los paramas
    if (selectedLabels.length > 0) {
      //? github esoera un campo labels y los params separados con ,
        params.append( 'labels',selectedLabels.join(",") )
    }
    //? tipamos con un arreglo de GithubIssues
    //? mandamos en el header los paramaetros (state)
    const {data} = await githubApi.get<GithubIssue[]>('/issues',{
      params,
    })

  return data
}
