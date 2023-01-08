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
      {/* todo: use next/image and set image */}
      <img
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        className="object-cover h-8 w-8 rounded-full"
        alt=""
      />
    </div>
  );
};
