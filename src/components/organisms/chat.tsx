import clsx from 'clsx';
import { UserComment, AIComment } from '@/components//atoms';
import { Chat as ChatType } from '@/types/store';

type Props = {
  className?: string;
  chats: ChatType[];
};

export const Chat = (props: Props) =>  {
  const {
    className,
    chats,
  } = props;

  return (
    <div className={clsx(
      "w-full px-5 flex flex-col justify-between",
      className
    )}>
      {chats.map((chat, index) => {
        return (
          <div key={index} className="flex flex-col mt-5 space-y-4">
            <UserComment
              text={chat.userComment}
            />
            <AIComment
              text={chat.aiComment}
            />
          </div>
        )
      })}
    </div>
  );
};
