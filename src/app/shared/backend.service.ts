import { Injectable } from '@angular/core';
import { Parcel } from './parcel';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiURL = 'http://localhost:3000'

  constructor() { }

  async getAll(): Promise<Parcel[]> {
    let response = await fetch(this.apiURL + '/parcels');
    let parcels = await response.json();
    return parcels;
  }

  async getOne(id: string): Promise<Parcel> {
    let response = await fetch(this.apiURL + '/parcels/' + id);
    let parcel = await response.json();
    return parcel;
  }

  async update(id: string, updateData: Parcel): Promise<Parcel> {
    let response = await fetch(this.apiURL + '/parcels/' + id, {
      method: 'PUT',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json'
      }});
    let parcel = await response.json();
    return parcel;
  }

  async deleteOne(id: string): Promise<{message: string}> {
    let response = await fetch(this.apiURL + '/parcels/' + id, {
      method: 'DELETE'
    });
    let message = await response.json();
    return message;
  }

  async createOne(newParcel: Parcel): Promise<Parcel> {
    let response = await fetch(this.apiURL + '/parcels', {
      method: 'POST',
      body: JSON.stringify(newParcel),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let parcel = await response.json();
    return parcel;
  }
}
