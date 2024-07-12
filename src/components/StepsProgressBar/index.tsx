import { Step } from "@/types";
import Checkbox from "../Checkbox";

type StepsProgressBarProps = {
  steps: Step[];
};

type StepTraceProps = {
  completed: boolean;
};

function StepTrace({ completed }: StepTraceProps) {
  return (
    <div
      className={`w-min h-8 border-l-2 
      ${completed ? "border-highlight" : "border-secondary"}
      absolute left-2 bottom-3 -z-10`}
    ></div>
  );
}

export function StepsProgressBar({ steps }: StepsProgressBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {steps?.map((step, i) => (
        <div key={i} className="flex flex-row gap-2 items-center relative">
          <Checkbox
            className={`!w-4 !h-4 bg-background ${
              step.current ? "!border-highlight" : "!border-secondary"
            }`}
            disabled
            checked={step.completed}
          />

          <span>{step.description}</span>

          <span className="font-nunitoBold flex-1 text-right">
            {step.value}
          </span>

          {i > 0 && <StepTrace completed={step.completed} />}
        </div>
      ))}
    </div>
  );
}
