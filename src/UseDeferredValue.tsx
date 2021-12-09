import { memo, useDeferredValue, useState } from "react";
import { Card, sleepSync } from "./utils";

// Real world example: Search highlighting + list filtering

export const UseDeferredValue = () => {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  return (
    <Card>
      <input
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Start typing"
        className="p-2 border rounded-lg w-full"
      />
      <SlowList text={deferredText} />
    </Card>
  );
};

const SlowList = memo(({ text }: { text: string }) => {
  return (
    <div>
      {Array(20)
        .fill(null)
        .map((_, i) => (
          <ListItem text={text} key={i} />
        ))}
    </div>
  );
});

const ListItem = ({ text }: { text: string }) => {
  sleepSync(10);
  return (
    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
      <span className="font-bold">Value:</span> {text}
    </div>
  );
};
