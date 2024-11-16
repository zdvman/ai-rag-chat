//src/app/page.tsx

// import Link from 'next/link';
import { ChatWrapper } from '@/components/ChatWrapper';
import { ragChat } from '@/lib/rag-chat';
import { cookies } from 'next/headers';
// import { processDomain } from '@/lib/parsing';

// Ensure the domain is processed on the server once before any user interaction
// async function ensureDomainProcessed(domain: string) {
//   try {
//     await processDomain(domain);
//     console.log('Domain processing completed!');
//   } catch (error) {
//     console.error('Error during domain processing:', error);
//   }
// }

// Server-side action: Trigger domain processing
// ensureDomainProcessed('https://www.anthonynolan.org/');

export default async function Home() {
  // Get the session ID from cookies
  const sessionCookie = cookies().get('sessionId')?.value;

  // Construct session ID
  const sessionId = (
    'https://www.anthonynolan.org/' +
    '--' +
    sessionCookie
  ).replace(/\//g, '');

  // Fetch initial messages from history for the chat
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
}
