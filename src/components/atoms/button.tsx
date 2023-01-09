import { ReactNode } from "react";
import clsx from 'clsx';

type Props = {
  disabled?: boolean;
  children: ReactNode
  handleClick: () => void;
  className?: string;
};

export const Button = (props: Props) =>  {
  const {
    disabled,
    children,
    handleClick,
    className,
  } = props;

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
        className,
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      { children }
    </button>
  );
};
