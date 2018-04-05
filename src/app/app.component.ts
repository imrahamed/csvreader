import { Component, OnDestroy, OnInit } from '@angular/core';
import {TerminalService} from 'primeng/components/terminal/terminalservice';
import {Subscription} from 'rxjs/Subscription';
import {TreeNode} from 'primeng/api';
import { DataService } from './data.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TerminalService]
})
export class AppComponent implements OnDestroy, OnInit {
  tables = [];
  user_ascess: boolean;
  subscription: Subscription;
  files: TreeNode[];
  selectedFile2;
  menu;
  draggedvalue;
  startIndex: any;
  dataIndex: any;
  selectedValues: any = {};
  tdmenu: any;

  constructor(private terminalService: TerminalService, private dataservice: DataService) {
      this.terminalService.commandHandler.subscribe(command => {
          const response = (command === 'imran') ? 'Welcome' : 'Wrong password';

          setTimeout(() => {
            if (command === 'imran') {
            this.user_ascess = true;
            }
          }, 500);
          this.terminalService.sendResponse(response);
      });
  }

  ngOnInit(): void {
    this.dataservice.getFiles().then(files => this.files = files);
    this.dataservice.getdata('../assets/set1/Set1 - file2.csv').then(
      (result) => {
        console.log(result);
      }
    );
    this.dataservice.getdata('../assets/set1/Set1 - file3.csv').then(
      (result) => {
        console.log(result);
      }
    );
    this.menu = [
      {label: 'Load', icon: 'fa-search', command: (event) => this.viewFile(this.selectedFile2)},
      {label: 'Delete', icon: 'fa-trash', command: (event) => this.unselectFile(this.selectedFile2)}
  ];
  this.tdmenu = [
    {label: 'Delete selected rows', icon: 'fa-trash', command: (event) => this.deleteRows(event)}
  ];
  }
  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  viewFile(data) {
    if (data.collapsedIcon === 'fa-folder') {
      const folder = _.find(
        this.files[0].children, (file) => {
          return file.data === data.data;
        }
      );
      _.forEach(
        folder.children, (file) => {
          this.dataservice.getdata(file.url).then(
            (parsed) => {
              const keys = [];
              _.forEach(
                parsed,
              (parse) => {
                parse.id = Math.floor(1000 + Math.random() * 9000);
              }
              );
              for (const key in parsed[0]) {
                if (parsed[0].hasOwnProperty(key) && key !== 'id') {
                  keys.push(key);
                }
              }
              this.tables.push(
                {
                  id: file.data,
                  data: parsed,
                  keys
                }
              );
              this.tables = _.uniqBy(this.tables, 'id');
              console.log(this.tables);
            }
          );
        }
      );
    } else {
      this.dataservice.getdata(data.url).then(
            (parsed) => {
              const keys = [];
              _.forEach(
                parsed,
              (parse) => {
                parse.id = Math.floor(1000 + Math.random() * 9000);
              }
              );
              for (const key in parsed[0]) {
                if (parsed[0].hasOwnProperty(key) && key !== 'id') {
                  keys.push(key);
                }
              }
              this.tables.push(
                {
                  id: data.data,
                  data: parsed,
                  keys
                }
              );
              this.tables = _.uniqBy(this.tables, 'id');
              console.log(this.tables);
            }
          );
    }
  }
  unselectFile(data) {
    if (data.collapsedIcon === 'fa-folder') {
      _.remove(
        this.files[0].children, (file) => {
          return file.data === data.data;
        }
      );
    } else {
      _.forEach(
        this.files[0].children, (folder) => {
          _.remove(
            folder.children, (file) => {
              return file.data === data.data;
            }
          );
        }
      );
    }
  }

  deletetable(i) {
    this.tables.splice(i, 1);
  }

  dragStart(event, tableIndex, dataIndex) {
    this.draggedvalue = event;
    this.startIndex = tableIndex;
    console.log(event, tableIndex);
  }

  dragEnd(event) {
    console.log(event);
  }
  drop(event, targetIndex, dropIndex) {
    console.log(dropIndex, 'dropped Index', targetIndex);
    // this.tables[this.startIndex].data.splice(this.dataIndex, 1);
    this.tables[this.startIndex].data = _.filter(this.tables[this.startIndex].data, (data: any) => {
        return data.id !== this.draggedvalue.id;
    });
    // console.log( this.draggedvalue);
    this.tables[this.startIndex].data = [...this.tables[this.startIndex].data];
    this.tables[targetIndex].data.push(this.draggedvalue);
    this.tables[targetIndex].data = [...this.tables[targetIndex].data];
  }

  deleteRows(event) {
    const keys =  _.keys(this.selectedValues);
    _.forEach(keys, (key) => {
      _.forEach(this.tables, (table) => {
        if (table.id === key) {
          _.forEach(this.selectedValues[key], (sel) => {
            table.data = _.filter(
              table.data, (tb) => {
                return tb.id !== sel.id;
              }
            );
          });
          table.data = [...table.data];
        }
      });
    });
  }
}
