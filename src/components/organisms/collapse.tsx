import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  heading: string;
  children: ReactNode;
};

export const Collapse = (props: Props) =>  {
  const {
    className,
    heading,
    children,
  } = props;

  return (
    <div className={clsx(
      className
    )}>
      <a className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="collapse" href="#collapseWithScrollbar" role="button" aria-expanded="false" aria-controls="collapseWithScrollbar">
        {heading}
      </a>
      <div className="collapse mt-4 max-h-60 overflow-y-auto" id="collapseWithScrollbar" >
        {children}
      </div>
    </div>
    
  );
};
