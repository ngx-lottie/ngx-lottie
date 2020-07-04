import { Component, Type, ɵivyEnabled as ivyEnabled } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';

// Do this before requiring `lottie-web`
// @ts-ignore
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  putImageData: jest.fn(),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
});

import * as lottie from 'lottie-web';

import { LottieModule, BMDestroyEvent } from '../';
import { AnimationOptions, AnimationItem } from '../src/symbols';

import animationData = require('./data.json');

describe('ngx-lottie', () => {
  function playerFactory() {
    return (lottie as unknown) as typeof import('lottie-web').default;
  }

  describe('ng-lottie component', () => {
    @Component({
      template: `
        <ng-lottie
          [width]="width"
          [height]="height"
          [options]="options"
          [styles]="styles"
          (animationCreated)="animationCreated($event)"
          (domLoaded)="domLoaded()"
          (destroy)="destroy($event)"
        ></ng-lottie>
      `,
    })
    class MockComponent {
      options: AnimationOptions = {
        animationData,
        loop: true,
        autoplay: true,
      };

      styles = {
        display: 'flex',
      };

      isDomLoaded = false;

      animationItem: AnimationItem = null!;

      destroyEvent: BMDestroyEvent = null!;

      width = '500px';

      height = '500px';

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
        imports: [LottieModule.forRoot({ player: playerFactory })],
        declarations: [MockComponent],
      });
    });

    it('Ivy should be enabled', () => {
      // Assert
      expect(ivyEnabled).toBeTruthy();
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

    it('should set width and height in "em"', () => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      fixture.componentInstance.width = '20em';
      fixture.componentInstance.height = '20em';
      fixture.detectChanges();
      const styles = fixture.debugElement.query(By.css('div:first-child')).styles;

      // Assert
      expect(styles.height).toBe('20em');
      expect(styles.width).toBe('20em');
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

    it('should emit "domLoaded" event when the svg is ready', fakeAsync(() => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      // `tick` is needed because Lottie triggers `DOMLoaded` event
      // after timeout, like
      // `setTimeout(() => trigger('DOMLoaded'), 0)`
      tick();

      // Assert
      expect(fixture.componentInstance.isDomLoaded).toBeTruthy();
    }));

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

  describe('[lottie] directive', () => {
    @Component({
      template: `
        <main
          lottie
          [options]="options"
          (animationCreated)="animationCreated($event)"
          (domLoaded)="domLoaded()"
          (destroy)="destroy($event)"
        ></main>
      `,
    })
    class MockComponent {
      options: AnimationOptions = {
        animationData,
        loop: true,
        autoplay: true,
      };

      styles = {
        display: 'flex',
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
        imports: [LottieModule.forRoot({ player: playerFactory })],
        declarations: [MockComponent],
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

    it('should emit necessary events', fakeAsync(() => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      // `tick` is needed because Lottie triggers `DOMLoaded` event
      // after timeout, like
      // `setTimeout(() => trigger('DOMLoaded'), 0)`
      tick();

      const { animationItem, isDomLoaded } = fixture.componentInstance;

      expect(animationItem).toBeTruthy();
      expect(isDomLoaded).toBeTruthy();

      fixture.destroy();

      // Assert
      expect(fixture.componentInstance.destroyEvent).toBeTruthy();
    }));
  });

  describe('Lazy loading', () => {
    @Component({
      template: `
        <ng-lottie
          width="500px"
          height="500px"
          [options]="options"
          [styles]="styles"
          (animationCreated)="animationCreated($event)"
        ></ng-lottie>
      `,
    })
    class MockComponent {
      options: AnimationOptions = {
        animationData,
        loop: true,
        autoplay: true,
      };

      styles = {
        display: 'flex',
      };

      isDomLoaded = false;

      animationItem: AnimationItem = null!;

      animationCreated(animationItem: AnimationItem): void {
        this.animationItem = animationItem;
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LottieModule.forRoot({ player: () => import('lottie-web') })],
        declarations: [MockComponent],
      });
    });

    it('should lazy load the "lottie-web" library', fakeAsync(() => {
      // Arrange & act
      const fixture = createFixture(MockComponent);
      tick(100);

      // Assert
      expect(fixture.componentInstance.animationItem).toBeDefined();
    }));
  });
});

function createFixture<T>(component: Type<T>): ComponentFixture<T> {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}
