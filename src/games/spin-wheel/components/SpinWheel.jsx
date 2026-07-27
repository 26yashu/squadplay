import { WheelCanvas } from './WheelCanvas';
import { Pointer } from './Pointer';
import { SpinButton } from './SpinButton';

export function SpinWheel({ items, currentRotation, duration, onSpin, isSpinning }) {
  return (
    <div className="flex flex-col items-center justify-center relative w-full mt-10">
      <div className="relative">
        <Pointer isSpinning={isSpinning} />
        <WheelCanvas items={items} currentRotation={currentRotation} duration={duration} />
      </div>
      <SpinButton onClick={onSpin} disabled={isSpinning || items.length === 0} />
    </div>
  );
}
