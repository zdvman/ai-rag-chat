import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="mb-3 ml-1">
          Enter a website URL as the route to get started collect data from the website for ai-chatbot
          <Link className="block underline" href="http://localhost:3000/https://www.anthonynolan.org/help-save-a-life/join-stem-cell-register">
            {"http://localhost:3000/https://www.anthonynolan.org/help-save-a-life/join-stem-cell-register"}
          </Link>
        </div>
      </div>
    </main>
  );
}
