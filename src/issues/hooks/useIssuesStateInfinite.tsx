import { useInfiniteQuery } from "@tanstack/react-query"
import { State } from "../interfaces/issues.interface"
import { getIssuesState } from "../actions/get-issues-state.actions";

interface Props {
    state: State;
    selectedLabels: string[]
}

export const useIssuesStateInfinite = ({ state, selectedLabels }: Props) => {


    //? manejar la informacion de los issues de react para un scroll infinito
    //? ademas de cambiar en algunas cosas

    const issuesQuery = useInfiniteQuery({
        queryKey: ['issues','infinite', { state, selectedLabels}],
        //? obtenemos la pagina y el mismo queryKey de arriba 
        queryFn: ({pageParam,queryKey}) => {
            
            //? deestructuramos args para obtener state, selectedLabels
            const  [,,args] = queryKey;
            const {state, selectedLabels} = args as Props;

            return getIssuesState(state, selectedLabels,pageParam)
        },
        staleTime: 1000 * 60,
        initialPageParam:0,
        getNextPageParam: (lastPage, pages) => 
            //? si hay datos regresa el pages mas uno 
            //? sino undefined
            lastPage.length > 0 ? pages.length + 1 : undefined
        })

    return {

        issuesQuery,
    }
}
