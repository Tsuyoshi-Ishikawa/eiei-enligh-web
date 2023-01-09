import Image from 'next/future/image';
import clsx from 'clsx';

type Props = {
  className?: string;
  text: string;
};

export const UserComment = (props: Props) =>  {
  const {
    className,
    text,
  } = props;

  return (
    <div className={clsx(
      "flex justify-end",
      className
    )}>
      <div
        className="mr-2 py-3 px-4 bg-green-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
      >
        {text}
      </div>
      <Image
        src='/images/account.png'
        className="object-cover h-8 w-8 rounded-full"
        alt='Girl'
        width={500} height={500}
        />
    </div>
  );
};
