import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Parcel } from '../shared/parcel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
 
  private bs = inject(BackendService)
  parcel!: Parcel;
  deleteStatus: boolean = false;
  filterText: string = '';
  parcels: Parcel[] = [];



  ngOnInit(): void {
    this.bs.getAll()
    .then( response => {
    this.parcels= response;
    this.sortParcelsByDate();
  })
    .then( parcels => console.log(' parcels in TableComponent : ', parcels ))   
  }
  
  delete(id: number): void {
    this.bs.getOne(String(id))
    .then(
      response => {
        this.parcel = response
        this.deleteStatus = true;
      }
    )   
  }

  confirm() {
    this.bs.deleteOne(String(this.parcel.id))
    .then ( () => {
      this.bs.getAll()
      .then ( response => {
        this.parcels = response;
        this.deleteStatus = false;
      })
    })
  }

  cancel() {
    this.deleteStatus = false;
  }

  private sortParcelsByDate(): void {
    this.parcels.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }


  }
