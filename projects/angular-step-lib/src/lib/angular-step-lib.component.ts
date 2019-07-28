import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Input, AfterViewInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

import { Observable, forkJoin } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Form } from './core/form';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { inherits } from 'util';

@Component({
  selector: 'lib-angular-step-lib',
  templateUrl: './angular-step-lib.component.html',
  styleUrls: ['./angular-step-lib.component.css'],
  animations: [
    trigger('currentStep', [
      state('true', style({
        borderColor: '#3f51b5',
        color: '#3f51b5',
        fontWeight: 'bold'
      })),
      state('false', style({
        borderColor: 'gray',
        color: 'gray',
        fontWeight: 'normal'
      })),
      transition('true => false', [
        style({
          borderColor: '#3f51b5',
          color: '#3f51b5',
          fontWeight: 'bold'
        }),
        animate('1s ease', style({
          borderColor: 'gray',
          color: 'gray',
          fontWeight: 'normal'
        }))
      ]),
      transition('false => true', [
        style({
          borderColor: 'gray',
          color: 'gray',
          fontWeight: 'normal'

        }),
        animate('1s 0.65s ease', style({
          borderColor: '#3f51b5',
          color: '#3f51b5',
          fontWeight: 'bold'
        }))
      ]),
    ]),
    //

    trigger('display', [
      state('true', style({
        display: 'block',
        height: '*'
      })),
      state('false', style({
        display: 'none',
        height: '0%'
      })),
      transition('true => false', [

        style({ height: '*' }),
        animate('1s ease', style({
          opacity: '0',
          height: '0%'

        }))
      ]),
      transition('false => true', [
        style({
          display: 'block',
          opacity: 0,
          height: '0%'
        }),
        animate('1s ease', style({
          opacity: '1',
          height: '*'
        }))
      ]),
    ]),

    trigger('visibility', [
      state('true', style({
        visibility: 'visible',
        opacity: '1'
      })),
      state('false', style({
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('true => false', [

        animate('1s', style({
          opacity: '0'
        }))
      ]),
      transition('false => true', [
        style({ visibility: 'visible' }),
        animate('1s', style({
          opacity: '1'
        }))
      ]),

    ]),


    trigger('slideStatus', [

      state('not-entered', style({
        transform: 'translateX(100%)',
        display: 'none'
      })),
      state('entered', style({
        transform: 'translateX(0%)',
        display: 'block'
      })),
      state('passed', style({
        transform: 'translateX(-100%)',
        display: 'none'
      })),


      transition('void => *', [
        animate('0s')
      ]),

      transition('not-entered => entered, passed => entered', [
        style({ display: 'block' }),
        animate('1s 0.65s ease')
      ]),

      transition('* => *', [
        animate('1s ease')
      ]),
    ])
  ]
})
export class AngularStepLibComponent implements OnInit, AfterViewInit {


  constructor(private resolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) { }

  @Input() public form: Form;

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    setTimeout(() => {
      this.form.load();
    }, 0);
  }

}

