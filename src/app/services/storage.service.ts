import { Injectable } from '@angular/core';

const Storage  = localStorage;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store( storageKey: string, value: any){ 
      await Storage.setItem(storageKey,value);
  }

  async get( storageKey: string){ 
    const ret = await Storage.getItem(storageKey);
    if(ret){ 
      return ret;
    }else{ 
      return false;
    }
  }

  async removeItem( storageKey: string){ 
    await Storage.removeItem(storageKey);
  }

  async clear(){ 
    await Storage.clear();
  }

}
