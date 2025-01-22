import { useQuery } from "@tanstack/react-query"
import { State } from "../interfaces/issues.interface"
import { getIssuesState } from "../actions/get-issues-state.actions";
import { useEffect, useState } from "react";

interface Props {
    state: State;
    selectedLabels: string[]
}

export const useIssuesState = ({ state, selectedLabels }: Props) => {

    //? state para manejar el estado de la page
    const [page, setPage] = useState(1);

    //? manejar la informacion de los issues de react
    const issuesQuery = useQuery({
        //? nueva key para obtener la infromacion filtrada
        //? queryKey: ['issues',{state}], 
        //? {} => no importa el orden para filtrar en la peticion
        queryKey: ['issues', { state, selectedLabels, page }],
        queryFn: () => getIssuesState(state, selectedLabels, page),
        staleTime: 1000 * 60 * 60,
    })

    //? cada que cambie mi estado o mi labels
    //? regreso a la pagina uno
    useEffect(() => {
        setPage(1);
    }, [state]);

    useEffect(() => {
        setPage(1);
    }, [selectedLabels]);

    const nextPage = () => {
        //? si no hay data 
        if (issuesQuery.data?.length === 0) return;
        //? page + 1
        setPage((newPage) => newPage + 1);
    }

    const prevPage = () => {
        //? si es igual a uno
        if (page === 1) return;
        setPage((prevPage) => prevPage - 1);
    }

    return {
        issuesQuery,
        page,
        nextPage,
        prevPage

    }
}
