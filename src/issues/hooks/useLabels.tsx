import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions/get-labels.actions";
import { sleep } from "../../helpers/sleep";
// import { GithubLabel } from "../interfaces/label.interface";

export const useLabels = () => {
  sleep(3000);
  //? utilizamos tanstack query
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    //? propiedad que me permite tener almacenado 
    //? la data de la peticion por un intervalo de tiempo
    // ? evito peticiones innecesarias 
    staleTime: 1000 * 60 * 60, //? 1hora,
    //? placeholder que dara un indicio de como se mira la data 
    //? antes de completar la peticion
    // placeholderData:[
    //   {"id":791921801,
    //     "node_id":"MDU6TGFiZWw3OTE5MjE4MDE=",
    //     "url":"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //    "name":"❤️",
    //   "color":"ffffff",
    //   "default":false,
    // } satisfies GithubLabel],
    // //? tipamos el placeholder con satisfies

    // initialData:[
    // //? initial data funciona mas o menos como placeholoder
    // //? pero matiene la (N)informacion con el stiletime(1 hora se mostrar => )
    // //? da la impresion de que la apliacacion ya tiene datos (user experience)
    //   {"id":791921801,
    //     "node_id":"MDU6TGFiZWw3OTE5MjE4MDE=",
    //     "url":"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //    "name":"❤️",
    //   "color":"ffffff",
    //   "default":false,
    // } satisfies GithubLabel],
  });


  return {
    labelsQuery
  }
}
