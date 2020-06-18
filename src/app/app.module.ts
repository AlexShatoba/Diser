import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EslintServices } from './service/eslint.services';
import { HttpClientModule } from '@angular/common/http';
import { LineCodeResultMapper } from './service/model/line-code-result';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule,
  ],
  providers: [
    EslintServices,
    LineCodeResultMapper,
  ],
  exports: [
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
