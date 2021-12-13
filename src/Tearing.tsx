import { startTransition, useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { Card, sleepSync } from "./utils";

type Listener = () => void;

let externalState = { count: 0 };
type ExternalState = typeof externalState;
const listeners: Listener[] = [];

// A function that will modify our external state
function dispatch(action: "increment") {
  if (action === "increment") {
    externalState = { count: externalState.count + 1 };
  }

  listeners.forEach((listener) => listener());
}

// A function that lets us subscribe to the external store
function subscribe(listener: Listener) {
  listeners.push(listener);

  return () => {
    listeners.splice(listeners.indexOf(listener), 1);
  };
}

// Here we call increment in a setInterval
// But this could easily happen in something like an onClick, or an API response handler, for example
setInterval(() => {
  dispatch("increment");
}, 50);

// A hook that lets us use the external store in React
function useExternalState() {
  // Store our state in a useState
  const [state, setState] = useState(externalState);

  // Subscribe to the external store
  useEffect(() => {
    return subscribe(() => {
      setState(externalState);
    });
  }, []);

  return state;
}

// The way to do it in React 18
// function useExternalState() {
//   const state = useSyncExternalStore(subscribe, () => externalState);
//   return state;
// }

// function useExternalSelector<SelectedValue>(
//   selector: (state: ExternalState) => SelectedValue,
// ) {
//   const selectedValue = useSyncExternalStoreWithSelector(
//     subscribe,
//     () => externalState,
//     null,
//     selector,
//   );

//   return selectedValue;
// }

export const Tearing = () => {
  const [show, setShow] = useState(false);

  return (
    <Card notes="Notice the inconsistent state when toggling the components below and concurrent rendering is on">
      <button
        onClick={() => {
          // We render the SlowComponents using concurrent rendering
          startTransition(() => {
            setShow(!show);
          });
        }}
      >
        Click to Toggle Slow Components
      </button>
      {show && (
        <>
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
          <SlowComponent />
        </>
      )}
    </Card>
  );
};

function SlowComponent() {
  // Simulate a slow component
  sleepSync(50);

  const { count } = useExternalState();
  return <h3>Counter: {count}</h3>;
}
