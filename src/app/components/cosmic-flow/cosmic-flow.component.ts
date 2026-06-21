import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// @ts-ignore: untyped NPM package
import webglFluid from 'webgl-fluid';
import { defaultFluidConfig } from './cosmic-flow.config';

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
      // HACK: webgl-fluid automatically binds the spacebar to document/window 'keydown' or 'keyup' 
      // to toggle the PAUSE state of the simulation. This freezes the canvas!
      // We temporarily override addEventListener to block ALL keyboard registrations.
      const originalWindowAddEventListener = window.addEventListener.bind(window);
      const originalDocumentAddEventListener = document.addEventListener.bind(document);

      const blockKeyboard = function (originalFn: any) {
        return function (type: string, listener: any, options: any) {
          if (['keydown', 'keyup', 'keypress'].includes(type)) {
            return; // Block completely
          }
          originalFn(type, listener, options);
        };
      };

      window.addEventListener = blockKeyboard(originalWindowAddEventListener) as any;
      document.addEventListener = blockKeyboard(originalDocumentAddEventListener) as any;

      webglFluid(canvas, defaultFluidConfig);

      // Restore native window/document behavior immediately
      window.addEventListener = originalWindowAddEventListener;
      document.addEventListener = originalDocumentAddEventListener;
    } catch (e) {
      console.warn("WebGL Fluid failed to initialize on this device.", e);
    }
  }

  ngOnDestroy() {
    // The webgl-fluid library usually binds directly to the canvas, so just letting it destroy is fine.
  }
}
