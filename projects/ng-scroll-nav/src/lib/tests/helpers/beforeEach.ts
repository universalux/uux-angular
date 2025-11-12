import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestHost, TestHostWithAttr } from './testHosts';
import { NgScrollNav } from '../../ng-scroll-nav';

export interface ScrollNavElements {
  hostComponent: TestHost | TestHostWithAttr;
  fixture: ComponentFixture<TestHost | TestHostWithAttr>;
  scrollNav: DebugElement;
  scrollNavInstance: NgScrollNav;
  nav: DebugElement;
  prevButton: DebugElement;
  nextButton: DebugElement;
  contentContainer: DebugElement;
  content: DebugElement;
  linkList: DebugElement[];
}

const hosts = {
  attr: TestHostWithAttr,
  noAttr: TestHost,
};

export async function beforeEachScrollNavTest(hostType: keyof typeof hosts = 'attr') {

  const host = hosts[hostType];

  await TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(host);
  const hostComponent = fixture.componentInstance;

  const scrollNav = fixture.debugElement.query(By.directive(NgScrollNav));
  const scrollNavInstance = scrollNav.componentInstance;

  fixture.detectChanges();

  const nav = fixture.debugElement.query(By.css('.scrollNav'));
  const prevButton = fixture.debugElement.query(By.css('.scrollNav__arrowButton--prev'));
  const nextButton = fixture.debugElement.query(By.css('.scrollNav__arrowButton--next'));
  const contentContainer = fixture.debugElement.query(By.css('.scrollNav__contentContainer'));
  const content = fixture.debugElement.query(By.css('.scrollNav__content'));
  const linkList = fixture.debugElement.queryAll(By.css('a'));

  return {
    fixture,
    hostComponent,
    scrollNav,
    scrollNavInstance,
    nav,
    prevButton,
    nextButton,
    contentContainer,
    content,
    linkList
  };
}
