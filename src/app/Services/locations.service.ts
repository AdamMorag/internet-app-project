import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LocationsService {

  constructor(private _http: Http) { }

  public getLocations() {
    return this._http.get('/api/locations')
      .map(result => result.json());
  }
}
