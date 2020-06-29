import { Component, ViewEncapsulation, NgModule, OnChanges, SimpleChanges, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { EslintServices } from './service/eslint.services';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { LineCodeResult } from './service/model/line-code-result';
import { switchMap, startWith, tap, filter, delay } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public content = `document.getElementById('divId').propertyOne = 'value of first property';
document.getElementById('divId').propertyTwo = 'value of second property';
document.getElementById('divId').propertyThree = 'value of third property';

var element = document.getElementById('divId')
for(var i=0; i<len; i++) {
  element.innerHTML += i;
}

const a = new Array(len).map((e,i) => 2*i)

var res = []
res = Array.apply(undefined,arr.map(x=>x*2))

res = []
for (var i=0; i < arr.length; i++) {
  res.unshift(i);
}`;

  private code$ = new Subject<string>();

  public isLoading$ = new BehaviorSubject(false);

  public packages$ = new Subject<LineCodeResult[]>();

  constructor(
    private eslintService: EslintServices,
  ) {
    this.code$.pipe(
      filter(content => content.length > 0),
      delay(500),
      switchMap(content => this.eslintService.checkCode(content)),
      tap((res) => {
        res.sort((a, b) => a.type - b.type);
        this.isLoading$.next(false);
        this.packages$.next(res);
      }),
      startWith([])
    )
    .subscribe();
  }

  public changeEditor(): void {
    this.isLoading$.next(true);
    this.code$.next(this.content);
    this.packages$.next([]);
  }
}






















