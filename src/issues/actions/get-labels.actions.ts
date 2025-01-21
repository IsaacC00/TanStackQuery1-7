import { githubApi } from "../../api/github.Api";
import { sleep } from "../../helpers/sleep";
import { GithubLabel } from "../interfaces/label.interface";

//? funcion que cambiara al momento de utilizar axios
// ?peticion al repositorio de meta con problemas de facebook

export const getLabels = async (): Promise<GithubLabel[]> => {
  //? deleyt para observar que pasa
  await sleep(1500);

  const {data} = await githubApi.get<GithubLabel[]>('/labels')

  //? antiguo codigo
  // const resp = await fetch('https://api.github.com/repos/facebook/react/labels')
  //   .then(resp => resp.json())

  //     console.log({resp});
      
    return data;
}