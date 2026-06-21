import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// @ts-ignore: untyped NPM package
import webglFluid from 'webgl-fluid';

@Component({
  selector: 'app-cosmic-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosmic-flow.component.html',
  styleUrls: ['./cosmic-flow.component.css']
})
export class CosmicFlowComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef.nativeElement;

    // Make sure canvas spans exactly 100vw/100vh for webgl math
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // HACK: webgl-fluid naturally listens to the canvas element.
    // Because our canvas sits behind the website (z-index: -1), the overlying website blocks mouse events.
    // Instead of using pointer-events: none (which breaks clicking), we intercept the library's
    // addEventListener calls and force it to listen to the `window` instead.
    const originalAddEventListener = canvas.addEventListener.bind(canvas);
    canvas.addEventListener = function (type: string, listener: any, options: any) {
      if (['mousemove', 'mousedown', 'mouseup', 'touchstart', 'touchmove', 'touchend'].includes(type)) {
        window.addEventListener(type, (e: any) => {
          // webgl-fluid requires e.offsetX and e.offsetY to calculate fluid positions.
          // Native window events only reliably have clientX/clientY. We map them over.
          const proxyEvent = new Proxy(e, {
            get: function (target, prop) {
              if (prop === 'offsetX') {
                return target.touches && target.touches.length > 0 ? target.touches[0].clientX : target.clientX;
              }
              if (prop === 'offsetY') {
                return target.touches && target.touches.length > 0 ? target.touches[0].clientY : target.clientY;
              }
              const value = target[prop];
              if (typeof value === 'function') {
                return value.bind(target);
              }
              return value;
            }
          });
          listener(proxyEvent);
        }, options);
      } else {
        originalAddEventListener(type, listener, options);
      }
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize PavelDoGreat's WebGL Fluid engine
    try {
      webglFluid(canvas, {
        IMMEDIATE: true, // true = Splashes randomly on page load. false = Waits for mouse movement.
        TRIGGER: 'hover', // 'hover' = splat on mouse move. 'click' = splat only on mouse click.
        SIM_RESOLUTION: 128, // Higher = More detailed fluid physics but heavier on CPU/GPU. Lower = blocky/fast.
        DYE_RESOLUTION: 1024, // Higher = Sharper, more HD color rendering. Lower = blurry/pixelated colors.
        CAPTURE_RESOLUTION: 512, // Resolution of the canvas snapshot if the user captures it.
        DENSITY_DISSIPATION: 1.2, // How fast colors fade to black. Higher = fades very quickly. Lower = colors linger on screen.
        VELOCITY_DISSIPATION: 1.2, // How fast the fluid stops moving. Higher = stops quickly. Lower = fluid keeps drifting for a long time.
        PRESSURE: 0.4, // How much the fluid expands outwards. Higher = fluid bursts outward aggressively.
        PRESSURE_ITERATIONS: 20, // Physics accuracy for pressure. Higher = more accurate but slower performance.
        CURL: 50, // Swirliness. Higher = lots of tiny spinning vortexes. Lower = smooth, straight lines.
        SPLAT_RADIUS: 0.2, // Size of the mouse cursor brush. Higher = massive paint splashes. Lower = thin pen strokes.
        SPLAT_FORCE: 4000, // How fast the fluid shoots out from the mouse. Higher = violent, fast shooting fluid.
        SHADING: true, // true = gives the fluid a 3D lighting effect. false = flat 2D colors.
        COLORFUL: true, // true = cycles through the rainbow. false = uses a single static color.
        COLOR_UPDATE_SPEED: 15, // How fast it cycles through the rainbow. Higher = rapid disco colors.
        PAUSED: false, // true = freezes the animation entirely.
        BACK_COLOR: { r: 0, g: 0, b: 0 }, // RGB background color. Keep at 0,0,0 if TRANSPARENT is true.
        TRANSPARENT: true, // true = allows the website's dark background to show through.
        BLOOM: true, // true = enables the glowing neon effect.
        BLOOM_ITERATIONS: 7, // Quality of the glow. Higher = smoother glow.
        BLOOM_RESOLUTION: 256, // Resolution of the glow. Higher = sharper light shafts.
        BLOOM_INTENSITY: 0.3, // Brightness of the glow. Higher = blinding neon. Lower = subtle soft glow.
        BLOOM_THRESHOLD: 0.8, // How bright a pixel needs to be before it starts glowing.
        BLOOM_SOFT_KNEE: 0.7, // Smoothness of the glow cutoff transition.
        SUNRAYS: false, // true = enables cinematic light rays shooting out of the fluid.
        SUNRAYS_RESOLUTION: 196, // Quality of the light rays.
        SUNRAYS_WEIGHT: 1.0, // Intensity/length of the light rays.
      });
    } catch (e) {
      console.warn("WebGL Fluid failed to initialize on this device.", e);
    }
  }

  ngOnDestroy() {
    // The webgl-fluid library usually binds directly to the canvas, so just letting it destroy is fine.
  }
}
