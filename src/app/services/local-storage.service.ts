import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string): any {
    const res: string = localStorage.getItem(key);
    return JSON.parse(res);
  }

  save(key: string, data: any) {
    const dataString: string = JSON.stringify(data);
    localStorage.setItem(key, dataString);
    this[key].next(data);
  }

  changes(key: string) {
    this[key] = this[key] || new Subject();
    return this[key];
  }
}
