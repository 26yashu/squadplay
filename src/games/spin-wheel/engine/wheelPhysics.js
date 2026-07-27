export class WheelPhysics {
  constructor(config = {}) {
    this.minSpins = config.minSpins || 3;
    this.maxSpins = config.maxSpins || 8;
    this.duration = config.duration || 4000;
  }

  // Returns { finalAngle, duration, segmentIndex }
  calculateSpin(numSegments, currentAngle = 0) {
    if (numSegments === 0) return { finalAngle: 0, duration: this.duration, segmentIndex: 0 };
    
    // Total degrees for segments
    const segmentAngle = 360 / numSegments;
    
    // Choose a random winning segment index
    // Equal probability here, weighted could be passed in.
    const winningIndex = Math.floor(Math.random() * numSegments);
    
    // Calculate how many degrees to reach the center of the winning segment
    // Target angle is where the segment aligns with 0 degrees (top)
    // Formula for segment center pointing up: 360 - (index * segmentAngle + segmentAngle / 2)
    const targetOffset = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
    
    // Randomize slightly within the segment boundaries (padding 5 degrees)
    const padding = 5;
    const randomJitter = (Math.random() * (segmentAngle - padding * 2)) - (segmentAngle / 2 - padding);
    
    // Calculate total extra spins
    const extraSpins = this.minSpins + Math.random() * (this.maxSpins - this.minSpins);
    
    const finalAngle = currentAngle + (360 - (currentAngle % 360)) + (extraSpins * 360) + targetOffset + randomJitter;

    return {
      finalAngle,
      duration: this.duration,
      segmentIndex: winningIndex
    };
  }
}
