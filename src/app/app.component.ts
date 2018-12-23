import { Component, NgModule, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Diplom-maga';
  public content = 'var c = 1;';

  constructor() {}
  public esprima = require('esprima');

  public chngeEditor(): void {
    const r = this.esprima.parseScript(this.content);
    console.log(r);
  }

}
