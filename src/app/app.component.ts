import { Component, NgModule, OnChanges, SimpleChanges  } from '@angular/core';
import { EslintServices } from './service/eslint.services';
import { Observable, Subject } from 'rxjs';
import { LineCodeResult } from './service/model/line-code-result';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Diplom-maga';
  public content = `function buildUI(parent)  {
    parent.innerHTML = ""
    parent.innerHTML = [1,2].filter(e => e)
    parent.innerHTML += buildBody()
    parent.innerHTML += buildFooter()
    document.write(Date());
  }
  
  const parent = document.getElementById('d');
  parent.innerHTML = ''
  parent.innerHTML = ''`;
  private checked$ = new Subject<string>();
  public packages$: Observable<LineCodeResult[]> = this.checked$.pipe(
    tap((content) => {debugger}),
    filter(content => content.length > 0),
    switchMap(content => this.eslintService.checkCode(content)),
    startWith([])
  );
  constructor(
    private eslintService: EslintServices,
  ) {}
  public changeEditor(): void {
    this.checked$.next(this.content);
  }
}
