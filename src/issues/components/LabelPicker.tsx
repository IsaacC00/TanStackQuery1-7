import { LoaderSpinner } from "../../shared/components/LoaderSpinner";
import { useLabels } from "../hooks/useLabels";

interface Props{
  selectedLabels: string[];
  onLabelPicker: (label:string) => void;
}

export const LabelPicker = ({onLabelPicker, selectedLabels}:Props) => {
  const {labelsQuery} = useLabels();
  if (labelsQuery.isLoading) {
    return <div className="flex justify-center items-center h-52">
      <LoaderSpinner/>
    </div>
  }
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {
        labelsQuery.data?.map((data) => (
          <span
          key={data.id}
          onClick={() => onLabelPicker(data.name)}
          className={`${selectedLabels.includes(data.name) ? 'selected-label' : '' } animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white`}
          style={{ border: `1px solid #${data.color}` }}
        >
          {data.name}
        </span>
        ))
      }

    </div>
  );
};
