import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {TreeNode} from 'primeng/api';
import { PapaParseService } from 'ngx-papaparse';


@Injectable()
export class DataService {

  constructor(private http: Http, private papa: PapaParseService) { }
  getFiles() {
    return this.http.get('../assets/data.json')
                .toPromise()
                .then(res => <TreeNode[]> res.json().data);
}
getdata(url) {
  return new Promise(
    resolve => {
      this.http.get(
        url
      ).subscribe(
        (data: any) => {
          this.papa.parse(data._body, {
            header: true,
            complete: (results, file) => {
              console.log('Parsed: ', results);
              resolve(results.data);
          }
          });
    });
    }
  );
}

}

