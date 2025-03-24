import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { RouterLink } from '@angular/router';
import { Parcel } from '../shared/parcel';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentTime!: string;
  currentDate!: string;
  currentSales!: number;
  private bs = inject(BackendService)
  parcels: Parcel[] = [];
  timeUnits: { display: string, previous: string }[] = [];

  constructor() {
    this.updateTime();
  }

  ngOnInit(): void {
    this.bs.getAll()
      .then(response => {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        this.parcels = response.filter(parcel => {
          const parcelDate = new Date(parcel.date);
          return parcelDate >= lastWeek && parcelDate <= today;
        });
        if (this.parcels.length == 0 && response.length > 0) {
          this.parcels.push(response.reduce((latest, parcel) => {
            return new Date(parcel.date) > new Date(latest.date) ? parcel : latest;
          }));
        }
        this.currentSales = this.parcels.length;
        setInterval(() => this.updateTime(), 1000);
      });
  }

  updateTime(): void {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    this.currentTime = `${hours}:${minutes}:${seconds}`;

    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    this.currentDate = `${day}.${month}.${year}`;
  }
}
