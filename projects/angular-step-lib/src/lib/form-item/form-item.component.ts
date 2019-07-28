import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormItem } from '../core/form-item';


@Component({
  selector: 'lib-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {

  @Input() public componentType: any;

  @Input() public formItem: FormItem<any>;

  @Output() public componentAssigned: EventEmitter<any> = new EventEmitter<any>();



  constructor(private resolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.clear();

    const factory = this.resolver.resolveComponentFactory(this.componentType);

    let createdComponentRef = this.viewContainerRef.createComponent(factory);

    this.componentAssigned.next(createdComponentRef.instance);
  }
}
