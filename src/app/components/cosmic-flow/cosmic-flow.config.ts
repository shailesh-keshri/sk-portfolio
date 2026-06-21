export const defaultFluidConfig = {
  IMMEDIATE: true, // true = Splashes randomly on page load. false = Waits for mouse movement.
  TRIGGER: 'hover', // 'hover' = splat on mouse move. 'click' = splat only on mouse click.
  SIM_RESOLUTION: 128, // Good balance of performance and physics detail
  DYE_RESOLUTION: 1024, // High definition color
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 1.5, // Reduced from 3.5 so the colors linger beautifully on screen
  VELOCITY_DISSIPATION: 1.5, // Fluid drifts a bit longer
  PRESSURE: 0.4,
  PRESSURE_ITERATIONS: 20,
  CURL: 30, // Balanced swirliness
  SPLAT_RADIUS: 0.15, // The perfect middle ground! Big enough for a nice burst, small enough for a clean mouse pointer.
  SPLAT_FORCE: 3000, // Balanced force
  SHADING: true, // Gives it that premium 3D look
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 8, // Slower, more relaxing rainbow cycle
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: true,
  BLOOM: true,
  BLOOM_ITERATIONS: 7,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.15, // Lowered from 0.3 to reduce the blinding neon glare (lowers contrast)
  BLOOM_THRESHOLD: 0.6, // Colors start glowing a bit earlier but softer
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: false,
  SUNRAYS_RESOLUTION: 196, // Quality of the light rays.
  SUNRAYS_WEIGHT: 1.0, // Intensity/length of the light rays.
};
