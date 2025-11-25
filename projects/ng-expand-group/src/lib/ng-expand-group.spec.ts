import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgExpandGroup } from './ng-expand-group';
import { Component, DebugElement, provideZonelessChangeDetection, signal } from '@angular/core';
import { NgExpand } from 'ng-expand';
import { By } from '@angular/platform-browser';

@Component({
  imports: [NgExpand, NgExpandGroup],
  template: `
    <ng-expand-group (expandedItem)="expandOpenedItem.set($event)">
      <ng-expand label="Expand label 1">
        Expand content 1
      </ng-expand>
      <ng-expand label="Expand label 2">
        Expand content 2
      </ng-expand>
    </ng-expand-group>
  `
})
export class TestHost {
  expandOpenedItem = signal<number | null>(null);
}

describe('NgExpandGroup', () => {

  // Test Host declarations
  let hostComponent: TestHost;
  let fixture: ComponentFixture<TestHost>;
  // Component Declarations
  let expandGroup: DebugElement;
  let expandGroupInstance: NgExpandGroup;

  let expandChildren : DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHost);
    hostComponent = fixture.componentInstance;

    expandGroup = fixture.debugElement.query(By.directive(NgExpandGroup));
    expandGroupInstance = expandGroup.componentInstance;

    expandChildren = fixture.debugElement.queryAll(By.directive(NgExpand));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
    expect(hostComponent).toBeTruthy();
    expect(expandGroup).toBeTruthy();
    expect(expandGroupInstance).toBeTruthy();
    expect(expandChildren).toBeTruthy();
  });

  it('Should have two children with label and content', () => {
    expect(expandChildren.length).toBe(2);
    expandChildren.forEach((expand, index) => {
      const button = expand.query(By.css('.expand__button')).nativeElement as HTMLButtonElement;
      const content = expand.query(By.css('.expand__content')).nativeElement as HTMLDivElement;

      expect(button.innerText).toBe(`Expand label ${index + 1}`);
      expect(content.innerText).toBe(`Expand content ${index + 1}`);
    })
  });

  it('It should toggle the open state when opening another expand', () => {

    const expand1 = expandChildren[0].componentInstance as NgExpand;
    const expand2 = expandChildren[1].componentInstance as NgExpand;
    const expand1_btn = expandChildren[0].query(By.css('button')).nativeElement;
    const expand2_btn = expandChildren[1].query(By.css('button')).nativeElement;

    expect(expand1.isExpanded()).toBe(false);
    expect(expand2.isExpanded()).toBe(false);

    // Open first expand
    expand1_btn.click();
    fixture.detectChanges();

    expect(expand1.isExpanded()).toBeTrue();
    expect(expand2.isExpanded()).toBeFalse();

    // Open second expand
    expand2_btn.click();
    fixture.detectChanges();

    expect(expand1.isExpanded()).toBeFalse();
    expect(expand2.isExpanded()).toBeTrue();

  });

});
