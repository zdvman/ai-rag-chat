//src/components/Message.tsx

import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For advanced Markdown support

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn({
        'bg-zinc-800': isUserMessage,
        'bg-zinc-900/25': !isUserMessage,
      })}
    >
      <div className='p-6'>
        <div className='max-w-3xl mx-auto flex items-start gap-2.5'>
          <div
            className={cn(
              'size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center',
              {
                'bg-blue-950 border-blue-700 text-zinc-200': isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className='size-5' />
            ) : (
              <Bot className='size-5 text-white' />
            )}
          </div>

          <div className='flex flex-col ml-6 w-full'>
            <div className='flex items-center space-x-2'>
              <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                {isUserMessage ? 'You' : 'Anthony Nolan AI Assistant'}
              </span>
            </div>

            {/* Render content using ReactMarkdown */}
            <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]} // Use GFM for tables, strikethrough, etc.
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 underline hover:text-blue-700'
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
