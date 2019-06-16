import { Component, NgModule, OnChanges, SimpleChanges  } from '@angular/core';
import { Subject } from 'rxjs';

import * as esprimaImported from 'esprima';
 const esprima = esprimaImported;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Diplom-maga';
  public content = `class e{
    e() {
        c = ['a','b'].map(e=> e*1)
      }
  }`;
  public t = new Subject<any>();
  constructor() {}
  public changeEditor(): void {
    const r = esprima.parseScript(this.content);
    console.log(r);
    this.t.next(r);
  }
}
