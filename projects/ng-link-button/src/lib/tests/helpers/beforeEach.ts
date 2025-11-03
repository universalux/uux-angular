import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TestHost,
  TestHostHref,
  TestHostRouterLink,
  TestHostWithAttr,
} from './testHosts';
import { provideRouter } from '@angular/router';
import { NgLinkButton } from '../../ng-link-button';

export interface LinkButtonElements {
  hostComponent: | TestHost | TestHostWithAttr | TestHostHref | TestHostRouterLink;
  fixture: ComponentFixture<TestHost | TestHostWithAttr | TestHostHref | TestHostRouterLink>;
  linkButton: DebugElement;
  linkButtonInstance: NgLinkButton;
  linkButtonAnchor: DebugElement;
}

const hosts = {
  attr: TestHostWithAttr,
  noAttr: TestHost,
  href: TestHostHref,
  routerLink: TestHostRouterLink,
};

export async function beforeEachLinkButtonTest(hostType: keyof typeof hosts = 'attr') {

  const host = hosts[hostType];

  await TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection(), provideRouter([])],
  }).compileComponents();

  const fixture = TestBed.createComponent(host);
  const hostComponent = fixture.componentInstance;

  const linkButton = fixture.debugElement.query(By.directive(NgLinkButton));
  const linkButtonInstance = linkButton.componentInstance;

  fixture.detectChanges();

  const linkButtonAnchor = fixture.debugElement.query(By.css('a.linkButton'));

  return {
    fixture,
    hostComponent,
    linkButton,
    linkButtonInstance,
    linkButtonAnchor,
  };
}
