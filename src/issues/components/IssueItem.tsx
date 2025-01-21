import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces/issues.interface';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue } from '../actions/get-issue.actions';
import { getIssueComments } from '../actions/get-issue-comments.actions';
import { timeSince } from '../../helpers/timeSince';

interface Props {
  issue: GithubIssue;
}

export const IssueItem = ({ issue }: Props) => {

  const navigate = useNavigate();
  //? queryClient me va a permitir hacer el prefetch de la data
  //? o establecer data 
  const queryClient = useQueryClient();
  
  //? queryClient me va a permitir hacer el prefetch de la data
  const preFetchData = () => {
    queryClient.prefetchQuery({
      queryKey:['issues',issue.number],
      queryFn:() => getIssue( issue.number ),
      staleTime: 1000 * 60,
    })

    queryClient.prefetchQuery({
      queryKey:['issues',issue.number,'comments'],
      queryFn:() => getIssueComments( issue.number ),
      staleTime: 1000 * 60,
    })
     
  }

  const presetData = () => {
    queryClient.setQueryData(
      //? primero etablecemos el key
      ['issues',issue.number],
      //?como es la forma que tiene la informacion  
      issue,
      //? configuraciones adicionales
      {
        //? propiedade que permite tener la data como fresh(staleTime)
        updatedAt: Date.now() + 1000 * 60
      }
    )
  }

  return (
    <div
    onMouseEnter={
      presetData
    } 
    className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">
      {
        (issue.state === State.Open) ?
        <FiInfo size={30} color="red" className="min-w-10" /> :
        <FiCheckCircle size={30} color="green" className="min-w-10" /> 
      }

      <div className="flex flex-col flex-grow px-2 cursor-pointer">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          #{`${issue.number}`} opened {timeSince(issue.created_at)} ago by {' '}
          <span className="font-bold">{issue.user.login}</span>
        </span>
        <div className='flex flex-wrap'>
          {
            issue.labels.map( label => (
              <span key={label.id} 
                className='px-2 m-1 py-1 text-xs text-white rounded-md '
                style={{ border: `1px solid #${label.color}` }}
              >
                { label.name }
              </span>
            ))
          }
        </div>
      </div>

      <img
        src={`${issue.user.avatar_url}`}
        alt={`${issue.user.login}`}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">
          {issue.comments}
        </span>
      </div>
    </div>
  );
};
