import { MARKS, type MarkName } from './icons/Marks';

/**
 * Stands in for real photography/video wherever the brief calls for cinematic
 * imagery we don't have (filmmaking, crews, factories, events, etc). Swap the
 * container's `<PlaceholderVisual>` for a real `<img>`/`<video>` when assets
 * are supplied — surrounding layout/CSS is written to accept either.
 */
export function PlaceholderVisual({ icon, className }: { icon: MarkName; className?: string }) {
  const Mark = MARKS[icon];
  return (
    <div className={`placeholder-visual${className ? ` ${className}` : ''}`}>
      <Mark />
    </div>
  );
}
