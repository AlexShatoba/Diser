import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { LinterDto } from './dto/linter-dto';
import { LineCodeResultMapper, LineCodeResult } from './model/line-code-result';
import { Observable, of } from 'rxjs';

const MAIN_URL = 'http://localhost:8000';

@Injectable()
export class EslintServices {
  constructor(
    private httpClient: HttpClient,
    private lineCodeResultMapper: LineCodeResultMapper,
  ) { }

  public checkCode(code: string): Observable<LineCodeResult[]> {
    return this.httpClient.post<{res: LinterDto}>(`${MAIN_URL}/code`, { 'code': code }).pipe(
      map(({res}) => res.messages.map(errorLine => this.lineCodeResultMapper.from(errorLine))),
      catchError(e => {
        return of([]);
      })
    );
  }
}
