import { buildProps } from '../../../utils/props';

export const TabaleTabsProps = buildProps({});

export declare interface DraggableMoved {
  moved: {
    element: {
      [key: string]: any;
    };
    newIndex: number;
    oldIndex: number;
  };
}
