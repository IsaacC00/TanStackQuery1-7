import { useState } from 'react';

import { useIssuesStateInfinite } from '../hooks/useIssuesStateInfinite';

import { State } from '../interfaces/issues.interface';

import { LoaderSpinner } from '../../shared/components/LoaderSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

export const ListViewInfinite = () => {

  //? state para filtrar con labels 
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  //? state parar filtrat issues
  const [state, setState] = useState<State>(State.All);

  //? fucnion para filtrar lables
  const onLabelPicker = (label: string) => {

    if (selectedLabels.includes(label)) {
      //? filtramos siempre y cuando el label sea diferente del actual
      setSelectedLabels(selectedLabels.filter(actual => actual !== label))

    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  }

  //? state anterior para traer toda la data
  // const {issuesQuery} = useIssues();
  //? mandamos argumentos en nuestro state
  const { issuesQuery } = useIssuesStateInfinite({
    state: state,
    selectedLabels: selectedLabels,
  });

  //? en caso de no existir data mandamos un arreglo vacio
  const issues = issuesQuery.data?.pages.flat() ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (<LoaderSpinner />)
          : (
            <div className='flex flex-col justify-center'>
              <IssueList onStateChange={setState} state={state} issues={issues} />
              {/* botones */}
                <button 
                onClick={() =>issuesQuery.fetchNextPage()} 
                disabled={issuesQuery.isFetchingNextPage}
                className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>
                  {
                    //? metodo para saber si esta cargando 
                    //? cargamos el spinner caso contrario solo mandamos un mensaje
                    issuesQuery.isFetchingNextPage ? (<LoaderSpinner/>): 'Cargar Mas...'
                  }
                </button>
            </div>
          )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker onLabelPicker={onLabelPicker}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
