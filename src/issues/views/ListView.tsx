import { useState } from 'react';
import { LoaderSpinner } from '../../shared/components/LoaderSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces/issues.interface';
import { useIssuesState } from '../hooks/useIssuesState';
import { useIssues } from '../hooks/useIssues';

export const ListView = () => {

  //? state para filtrar con labels 
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  //? state parar filtrat issues
  const [state, setState] = useState<State>(State.All);
  
  //? fucnion para filtrar lables
  const onLabelPicker = (label:string) => {

    if (selectedLabels.includes(label)) {
      //? filtramos siempre y cuando el label sea diferente del actual
      setSelectedLabels( selectedLabels.filter( actual => actual!==label   ) )
      
    }else{
      setSelectedLabels([...selectedLabels, label]);
    }
  }

  //? state anterior para traer toda la data
  // const {issuesQuery} = useIssues();
  //? mandamos argumentos en nuestro state
   const {issuesQuery} = useIssuesState({
     state:state,
     selectedLabels:selectedLabels,
   });

  //? en caso de no existir data mandamos un arreglo vacio
  const issues = issuesQuery.data ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        { issuesQuery.isLoading ? <LoaderSpinner/> : <IssueList onStateChange={setState} state={state} issues={issues} /> }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker onLabelPicker={onLabelPicker} 
          selectedLabels={selectedLabels}
          />
      </div>
    </div>
  );
};
