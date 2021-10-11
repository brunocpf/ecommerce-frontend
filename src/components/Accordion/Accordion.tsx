import { ChevronDownIcon } from '@heroicons/react/outline';

export interface AccordionProps {
  title: string;
  expanded: boolean;
  onClickExpand: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  expanded,
  onClickExpand,
}) => {
  return (
    <div className="border-solid border-violet-500 border-2 rounded p-1">
      <button
        className="flex gap-1 py-1 w-full active:bg-gray-700 transition-colors"
        onClick={onClickExpand}
      >
        <ChevronDownIcon
          className={`h-6 w-6 ${
            expanded ? '' : 'rotate-180'
          } transform transition-transform`}
        />
        <span>{title}</span>
      </button>
      <div
        className={`${
          expanded ? 'block' : 'hidden'
        } overflow-hidden transition-all py-2`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
