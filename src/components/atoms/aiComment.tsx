import Image from 'next/future/image';
import clsx from 'clsx';

type Props = {
  className?: string;
  text: string;
};

export const AIComment = (props: Props) =>  {
  const {
    className,
    text,
  } = props;

  return (
    <div className={clsx(
      "flex justify-start",
      className
    )}>
      <Image
        src='/images/girl.png'
        className="object-cover h-8 w-8 rounded-full"
        alt='Girl'
        width={500} height={500}
        />
      <div
        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
      >
        {text}
      </div>
    </div>
  );
};
