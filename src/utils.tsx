import { FC } from "react";

/**
 * Lets you simulate a slow component or deeply nested component tree.
 *
 * This just blocks the thread for a given amount of time.
 */
export const sleepSync = (time: number) => {
  const now = performance.now();
  while (performance.now() - now < time) {}
};

export const Card: FC<{ notes?: string }> = ({ children, notes }) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      {notes && <div className="bg-black text-white text-xl p-5 font-bold">{notes}</div>}
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-5 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const sleepAsync = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const translations: Record<string, string> = {
  en: "Hello",
  fr: "Bonjour",
  es: "Hola",
  zh: "你好",
};

export const translationAPI = async (language: string) => {
  await sleepAsync(1000);

  return translations[language] ?? "Not found";
};
