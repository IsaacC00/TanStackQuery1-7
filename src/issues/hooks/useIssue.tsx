import { useQuery } from "@tanstack/react-query"
import { getIssue } from "../actions/get-issue.actions"
import { getIssueComments } from "../actions/get-issue-comments.actions";

//? peticion con id para traer un solo issue de reacg
export const useIssue = (issueNumber: number) => {
    //? manejar las informacion de los issues de reac t
    const issueQuery = useQuery({
        //? OJO pasamos el id como number
        //? si pasamos el id como string tanStackquery
        //? manejar el cache de optra manera
        queryKey: ['issues',issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000*60,
    });

    //? manejar las comentarios de un issue especifico de react 
    // const commentsQuery = useQuery({
    //     //? OJO pasamos el id como number
    //     //? si pasamos el id como string tanStackquery
    //     //? manejar el cache de optra manera
    //     queryKey: ['issues',issueNumber,'comments'],
    //     queryFn: () => getIssueComments(issueNumber),
    //     staleTime: 1000*60,
    // });

    //? manejar la peticion encaso de que dependa de la peticion anterior
    const commentsQuery = useQuery({
        //? la propiedad enable dira que no se habilite la peticion hasta que
        //? la data de issueQuery sea diferente de undefined
        enabled:issueQuery.data !== undefined,
        queryKey: ['issues',issueQuery.data?.number,'comments'],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        staleTime: 1000*60,
    });

    return {
        issueQuery,
        commentsQuery
    }
}
