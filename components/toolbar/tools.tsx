import type { BrushMode } from '@/lib/types';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStoreActions, useStoreBrushMode } from '@/hooks/use-store';
import { EraserIcon, PenIcon } from 'lucide-react';
import { FC } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

type Tool = {
  hotkey?: string;
  icon: React.ReactNode;
  title: string;
};

const ToolItem = ({ hotkey, icon, title }: Tool) => {
  return (
    <Label
      className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-input bg-popover hover:bg-accent peer-data-[state=checked]:border-violet-600 peer-data-[state=checked]:bg-violet-400 peer-data-[state=checked]:[&>p]:text-violet-700 peer-data-[state=checked]:[&>svg]:fill-violet-500 peer-data-[state=checked]:[&>svg]:stroke-violet-700"
      htmlFor={title.split(' ')[0]}
      title={title}
    >
      <p className="absolute right-1 top-0 text-xs text-input group-hover:text-accent-foreground">
        {hotkey}
      </p>
      {icon}
    </Label>
  );
};

const tools: Tool[] = [
  {
    hotkey: '1',
    icon: <PenIcon className="h-4 w-4" />,
    title: 'pen -- 1 or p',
  },
  {
    hotkey: '2',
    icon: <EraserIcon className="h-4 w-4" />,
    title: 'eraser -- 2 or e',
  },
];

interface ToolsProps {}

const Tools: FC<ToolsProps> = ({}) => {
  const brushMode = useStoreBrushMode();
  const { setBrushMode, setBrushSize } = useStoreActions();
  useHotkeys(['1', 'p'], () => {
    setBrushMode('pen');
    setBrushSize(1);
  });
  useHotkeys(['2', 'e'], () => setBrushMode('eraser'));
  return (
    <RadioGroup
      className="flex flex-row gap-1"
      onValueChange={(brush) => {
        if (brush === 'pen') {
          setBrushSize(1);
        } else if (brush === 'eraser') {
          setBrushSize(10);
        }
        setBrushMode(brush as BrushMode);
      }}
      value={brushMode}
    >
      {tools.map((tool) => (
        <div key={tool.title}>
          <RadioGroupItem
            className="peer sr-only"
            id={tool.title.split(' ')[0]}
            value={tool.title.split(' ')[0] as BrushMode}
          />
          <ToolItem hotkey={tool.hotkey} icon={tool.icon} title={tool.title} />
        </div>
      ))}
    </RadioGroup>
  );
};

export default Tools;
