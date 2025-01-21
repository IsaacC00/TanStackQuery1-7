import { useQuery } from "@tanstack/react-query"
import { sleep } from "../../helpers/sleep"
import { State } from "../interfaces/issues.interface"
import { getIssuesState } from "../actions/get-issues-state.actions";

interface Props {
    state: State;
    selectedLabels: string[]
}

export const useIssuesState = ({state,selectedLabels}:Props) => {
        sleep(3500);
    //? manejar la informacion de los issues de react
    const issuesQuery = useQuery({
        //? nueva key para obtener la infromacion filtrada
        //? queryKey: ['issues',{state}], 
        //? {} => no importa el orden para filtrar en la peticion
        queryKey: ['issues',{ state,selectedLabels }],
        queryFn: () => getIssuesState(state,selectedLabels),
        staleTime: 1000*60*60,
    })

    return {
        issuesQuery

    }
}
