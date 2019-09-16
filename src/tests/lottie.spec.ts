/// <reference types="jest" />

import { Component, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';

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
      options: LottieOptions = {
        animationData,
        loop: true,
        autoplay: true
      };

      styles: LottieCSSStyleDeclaration = {
        display: 'flex'
      };

      isDomLoaded = false;

      animationItem: AnimationItem = null!;

      destroyEvent: BMDestroyEvent = null!;

      animationCreated(animationItem: AnimationItem): void {
        this.animationItem = animationItem;
      }

      domLoaded(): void {
        this.isDomLoaded = true;
      }

      destroy(destroyEvent: BMDestroyEvent): void {
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
      // Arrange & act
      const fixture = createFixture(MockComponent);
      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      // Assert
      expect(svg).toBeTruthy();
      expect(svg instanceof SVGSVGElement).toBeTruthy();
    });

    it('should set custom width and height', () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      const styles = fixture.debugElement.query(By.css('div:first-child')).styles;

      // Assert
      expect(styles.height).toBe('500px');
      expect(styles.width).toBe('500px');
    });

    it('should set custom styles', () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      const styles = fixture.debugElement.query(By.css('div:first-child')).styles;

      // Assert
      expect(styles.display).toBe('flex');
    });

    it('should emit "animationCreated" event', () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      const animationItem = fixture.componentInstance.animationItem;

      // Assert
      expect(animationItem).toBeTruthy();
      expect(typeof animationItem.addEventListener).toBe('function');
    });

    it('should emit "domLoaded" event when the svg is ready', async () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      await fixture.whenRenderingDone();

      // Assert
      expect(fixture.componentInstance.isDomLoaded).toBeTruthy();
    });

    it('should emit "destroy" event', () => {
      // Arrange
      const fixture = createFixture(MockComponent);

      // Act
      fixture.destroy();
      const { destroyEvent } = fixture.componentInstance;

      // Assert
      expect(destroyEvent).toBeTruthy();
      expect(destroyEvent.type).toBe('destroy');
      expect(destroyEvent.target.constructor.name).toBe('AnimationItem');
    });
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
      options: LottieOptions = {
        animationData,
        loop: true,
        autoplay: true
      };

      styles: LottieCSSStyleDeclaration = {
        display: 'flex'
      };

      isDomLoaded = false;

      animationItem: AnimationItem = null!;

      destroyEvent: BMDestroyEvent = null!;

      animationCreated(animationItem: AnimationItem): void {
        this.animationItem = animationItem;
      }

      domLoaded(): void {
        this.isDomLoaded = true;
      }

      destroy(destroyEvent: BMDestroyEvent): void {
        this.destroyEvent = destroyEvent;
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LottieModule],
        declarations: [MockComponent]
      });
    });

    it('should create directive on the provided container', () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      const main = fixture.debugElement.query(By.css('main'));
      const svg = main.nativeElement.querySelector('svg');

      // Assert
      expect(main.nativeElement.localName).toEqual('main');
      expect(main.nativeElement instanceof HTMLElement).toBeTruthy();
      expect(svg instanceof SVGSVGElement).toBeTruthy();
    });

    it('should emit necessary events', async () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      await fixture.whenRenderingDone();

      const { animationItem, isDomLoaded } = fixture.componentInstance;

      expect(animationItem).toBeTruthy();
      expect(isDomLoaded).toBeTruthy();

      fixture.destroy();

      // Assert
      expect(fixture.componentInstance.destroyEvent).toBeTruthy();
    });
  });

  describe(LottieEventsService.name, () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LottieModule]
      });
    });

    it('should listen to events exposed by lottie', () => {
      // Arrange & act
      const fixture = createFixture(LottieComponent);
      const service = fixture.debugElement.injector.get(LottieEventsService);
      const listeners = service['listeners'];
      const animationItem = service['animationItem'];

      // Assert
      expect(animationItem).toBeTruthy();
      expect(listeners.size).toBeGreaterThan(0);
    });

    it('should release memory when animation item gets destroyed', () => {
      // Arrange & act
      const fixture = createFixture(LottieComponent);
      fixture.destroy();

      const service = fixture.debugElement.injector.get(LottieEventsService);
      const listeners = service['listeners'];
      const animationItem = service['animationItem'];

      // Assert
      expect(animationItem).toBeFalsy();
      expect(listeners.size).toEqual(0);
    });
  });
});

function createFixture<T>(component: Type<T>): ComponentFixture<T> {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}
