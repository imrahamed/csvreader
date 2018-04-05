import { NgModule } from '@angular/core';
import {TreeModule} from 'primeng/tree';

import { AppComponent } from './app.component';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TerminalModule} from 'primeng/terminal';
import { DataService} from './data.service';
import { Http, HttpModule,  } from '@angular/http';
import {ContextMenuModule} from 'primeng/contextmenu';
import { PapaParseModule } from 'ngx-papaparse';
import {DataTableModule} from 'primeng/datatable';
import {ButtonModule} from 'primeng/button';
import {DragDropModule} from 'primeng/dragdrop';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TerminalModule,
    TreeModule,
    HttpModule,
    ContextMenuModule,
    PapaParseModule,
    DataTableModule,
    ButtonModule,
    DragDropModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
