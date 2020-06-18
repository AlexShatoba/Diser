import { Component, NgModule, OnChanges, SimpleChanges, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { EslintServices } from './service/eslint.services';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { LineCodeResult } from './service/model/line-code-result';
import { switchMap, startWith, tap, filter, delay } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'Diplom-maga';
  public content = `function buildUI(parent)  {
    parent.innerHTML = ""
    parent.innerHTML = [1,2].filter(e => e)
    document.write(Date());
  }
  
  const parent = document.getElementById('d');
  parent.innerHTML = ''
  parent.innerHTML = ''
  const a = new Array(12);
  document.getElementById('elem').propertyOne = 'value of first property';
  document.getElementById('elem').propertyTwo = 'value of second property';
  document.getElementById('elem').propertyThree = 'value of third property';`;

  private checked$ = new Subject<string>();

  public isLoding$ = new BehaviorSubject(false);

  public packages$ = new Subject<LineCodeResult[]>();

  constructor(
    private eslintService: EslintServices,
  ) { 
    this.checked$.pipe(
      tap((content) => { debugger }),
      filter(content => content.length > 0),
      delay(500),
      switchMap(content => this.eslintService.checkCode(content)),
      tap((res) => {
        this.isLoding$.next(false);
        this.packages$.next(res);
      }),
      startWith([])
    )
    .subscribe();
  }

  public changeEditor(): void {
    this.isLoding$.next(true);
    this.checked$.next(this.content);
    this.packages$.next([])
  }
}
