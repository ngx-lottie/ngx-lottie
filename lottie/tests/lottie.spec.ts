import { Component } from '@angular/core';
import { TestBed, tick, fakeAsync } from '@angular/core/testing';

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => {
    return {
      fillStyle: null,
      fillRect: jest.fn(),
      drawImage: jest.fn(),
      getImageData: jest.fn()
    };
  })
});

import {
  LottieModule,
  LottieOptions,
  AnimationItem,
  BMDestroyEvent,
  LottieCSSStyleDeclaration
} from '../';

import animationData = require('./data.json');

function query(element: HTMLElement, name: string): HTMLElement | null {
  return element.querySelector(name);
}

describe(LottieModule.name, () => {
  @Component({
    template: `
      <ng-lottie
        width="500"
        height="500"
        [options]="options"
        [styles]="styles"
        (animationCreated)="animationCreated($event)"
        (domLoaded)="domLoaded()"
        (destroy)="destroy($event)"
      ></ng-lottie>
    `
  })
  class MockComponent {
    public options: LottieOptions = {
      animationData,
      loop: true,
      autoplay: true
    };

    public styles: LottieCSSStyleDeclaration = {
      display: 'flex'
    };

    public isDomLoaded = false;

    public animationItem: AnimationItem = null!;

    public destroyEvent: BMDestroyEvent = null!;

    public animationCreated(animationItem: AnimationItem): void {
      this.animationItem = animationItem;
    }

    public domLoaded(): void {
      this.isDomLoaded = true;
    }

    public destroy(destroyEvent: BMDestroyEvent): void {
      this.destroyEvent = destroyEvent;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LottieModule],
      declarations: [MockComponent]
    });
  });

  it('should render "svg" element successfully', () => {
    // Arrange
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    const svg = query(fixture.debugElement.nativeElement, 'svg')!;
    // Assert
    expect(svg).toBeTruthy();
    expect(svg.constructor).toBe(SVGSVGElement);
    fixture.destroy();
  });

  it('should set custom width and height', () => {
    // Arrange
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    const lottie = query(fixture.debugElement.nativeElement, 'div:first-child')!;
    const { height, width } = lottie.style;
    // Assert
    expect(height).toBe('500px');
    expect(width).toBe('500px');
  });

  it('should set custom styles', () => {
    // Arrange
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    const lottie = query(fixture.debugElement.nativeElement, 'div:first-child')!;
    const { display } = lottie.style;
    // Assert
    expect(display).toBe('flex');
  });

  it('should emit "animationCreated" event', () => {
    // Arrange
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    const { animationItem } = fixture.componentInstance;
    // Assert
    expect(animationItem).toBeTruthy();
    expect(typeof animationItem.addEventListener).toBe('function');

    fixture.destroy();
  });

  it('should emit "domLoaded" event when the svg is ready', fakeAsync(() => {
    // Arrange
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    tick(100);

    // Assert
    expect(fixture.componentInstance.isDomLoaded).toBeTruthy();
    fixture.destroy();
  }));

  it('should emit "destroy" event', () => {
    // Arrange
    const fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    fixture.destroy();
    const { destroyEvent } = fixture.componentInstance;
    // Assert
    expect(destroyEvent).toBeTruthy();
    expect(destroyEvent.type).toBe('destroy');
    expect(destroyEvent.target.constructor.name).toBe('AnimationItem');
  });
});
