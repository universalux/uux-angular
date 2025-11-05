import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestHost, TestHostWithAttr } from './testHosts';
import { NgSimpleButton } from '../../ng-simple-button';

export interface SimpleButtonElements {
  hostComponent: | TestHost | TestHostWithAttr;
  fixture: ComponentFixture<TestHost | TestHostWithAttr>;
  simpleButton: DebugElement;
  simpleButtonInstance: NgSimpleButton;
  simpleButtonBtn: DebugElement;
}

const hosts = {
  attr: TestHostWithAttr,
  noAttr: TestHost,
};

export async function beforeEachSimpleButtonTest(hostType: keyof typeof hosts = 'attr') {

  const host = hosts[hostType];

  await TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(host);
  const hostComponent = fixture.componentInstance;

  const simpleButton = fixture.debugElement.query(By.directive(NgSimpleButton));
  const simpleButtonInstance = simpleButton.componentInstance;

  fixture.detectChanges();

  const simpleButtonBtn = fixture.debugElement.query(By.css('.simpleButton'));

  return {
    fixture,
    hostComponent,
    simpleButton,
    simpleButtonInstance,
    simpleButtonBtn,
  };
}
