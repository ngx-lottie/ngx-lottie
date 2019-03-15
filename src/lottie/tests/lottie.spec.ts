import { Component, Type } from '@angular/core';
import { TestBed, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';

import {
  LottieModule,
  LottieComponent,
  LottieDirective,
  LottieOptions,
  AnimationItem,
  BMDestroyEvent,
  LottieCSSStyleDeclaration
} from '../';
import { LottieEventsService } from '../src/core/services/lottie-events.service';

import animationData = require('./data.json');

describe('lottie', () => {
  beforeAll(() => {
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
  });

  describe(LottieComponent.name, () => {
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

    it('should render "svg" element successfully', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      const svg = query(fixture.debugElement.nativeElement, 'svg')!;

      // Assert
      expect(svg).toBeTruthy();
      expect(svg instanceof SVGSVGElement).toBeTruthy();
    }));

    it('should set custom width and height', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      const lottie = query(fixture.debugElement.nativeElement, 'div:first-child')!;
      const { height, width } = lottie.style;

      // Assert
      expect(height).toBe('500px');
      expect(width).toBe('500px');
    }));

    it('should set custom styles', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      const lottie = query(fixture.debugElement.nativeElement, 'div:first-child')!;
      const { display } = lottie.style;

      // Assert
      expect(display).toBe('flex');
    }));

    it('should emit "animationCreated" event', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      const { animationItem } = fixture.componentInstance;

      // Assert
      expect(animationItem).toBeTruthy();
      expect(typeof animationItem.addEventListener).toBe('function');
    }));

    it('should emit "domLoaded" event when the svg is ready', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Assert
      expect(fixture.componentInstance.isDomLoaded).toBeTruthy();
    }));

    it('should emit "destroy" event', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      fixture.destroy();
      const { destroyEvent } = fixture.componentInstance;

      // Assert
      expect(destroyEvent).toBeTruthy();
      expect(destroyEvent.type).toBe('destroy');
      expect(destroyEvent.target.constructor.name).toBe('AnimationItem');
    }));
  });

  describe(LottieDirective.name, () => {
    @Component({
      template: `
        <main
          lottie
          [options]="options"
          (animationCreated)="animationCreated($event)"
          (domLoaded)="domLoaded()"
          (destroy)="destroy($event)"
        ></main>
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

    it('should create directive on the provided container', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      const main = query(fixture.debugElement.nativeElement, 'main')!;
      const svg = query(main, 'svg')!;

      // Assert
      expect(main.localName).toEqual('main');
      expect(main instanceof HTMLElement).toBeTruthy();
      expect(svg instanceof SVGSVGElement).toBeTruthy();
    }));

    it('should emit necessary events', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      const { animationItem, isDomLoaded } = fixture.componentInstance;

      expect(animationItem).toBeTruthy();
      expect(isDomLoaded).toBeTruthy();

      fixture.destroy();

      expect(fixture.componentInstance.destroyEvent).toBeTruthy();
    }));
  });

  describe(LottieEventsService.name, () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LottieModule]
      });
    });

    it('should listen to events exposed by lottie', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(LottieComponent);

      // Act
      const { listeners, animationItem } = fixture.debugElement.injector.get(LottieEventsService);

      // Assert
      expect(animationItem).toBeTruthy();
      expect(listeners.size).toBeGreaterThan(0);
    }));

    it('should release memory when animation item gets destroyed', fakeAsync(() => {
      // Arrange
      const fixture = createFixture(LottieComponent);

      // Act
      fixture.destroy();

      const { listeners, animationItem } = fixture.debugElement.injector.get(LottieEventsService);

      // Assert
      expect(animationItem).toBeFalsy();
      expect(listeners.size).toEqual(0);
    }));
  });
});

function query(element: HTMLElement, name: string): HTMLElement | null {
  return element.querySelector(name);
}

function createFixture<T>(component: Type<T>): ComponentFixture<T> {
  try {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  } finally {
    tick(100);
  }
}
