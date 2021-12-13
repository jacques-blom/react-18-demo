import clsx from "clsx";
import { memo, useState, useTransition } from "react";
import { Slider } from "rsuite";

export const StartTransition = () => {
  const [resolution, setResolution] = useState(0);

  const [isPending, startTransition] = useTransition();

  return (
    <div className="absolute inset-0" style={{ backgroundImage: `url('/map.png')` }}>
      <Pins resolution={resolution} />
      <div
        className={clsx(
          "absolute inset-0 bg-yellow-50 bg-opacity-30 opacity-0 transition-opacity",
          isPending && "opacity-100",
        )}
      />
      <Controls
        onChange={(resolution) => {
          startTransition(() => {
            setResolution(resolution);
          });
        }}
      />
    </div>
  );
};

const Pins = memo(
  ({ resolution, className }: { resolution: number; className?: string }) => {
    return (
      <div className={clsx("flex flex-wrap", className)}>
        {Array(resolution * 100)
          .fill(null)
          .map((_, index) => (
            <MapPin key={index} />
          ))}
      </div>
    );
  },
);

const Controls = ({ onChange }: { onChange: (resolution: number) => void }) => {
  const [resolution, setResolution] = useState(0);

  return (
    <div className="absolute text-white inset-x-0 flex items-center bg-black p-3 justify-between space-x-2">
      <div className="text-lg font-bold flex-1">Change map resolution</div>
      <div className="font-bold mr text-xl">{resolution}</div>
      <div className="max-w-xs flex-1">
        <Slider
          min={0}
          max={20}
          value={resolution}
          onChange={(value) => {
            setResolution(value);
            onChange(value);
          }}
          tooltip={false}
        />
      </div>
    </div>
  );
};

const MapPin = memo(() => {
  const [positionX] = useState(Math.random() * 100);
  const [positionY] = useState(Math.random() * 100);

  return (
    <div
      className="w-2.5 h-2.5 shadow-lg bg-blue-500 rounded-full absolute"
      style={{
        top: `${positionY}%`,
        left: `${positionX}%`,
      }}
    />
  );
});
