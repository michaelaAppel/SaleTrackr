import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { Parcel } from '../shared/parcel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private bs = inject(BackendService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  parcel!: Parcel;
  id: string | null = ''
  form = new FormGroup({
    dateControl: new FormControl,
    platformControl: new FormControl<string>(''),
    streetControl: new FormControl<string>(''),
    housenumberControl: new FormControl<string>(''),
    plzControl: new FormControl<string>(''),
    ortControl: new FormControl<string>(''),
    firstNameControl: new FormControl<string>(''),
    lastNameControl: new FormControl<string>(''),
    parcelwidthControl: new FormControl,
    parcellengthControl: new FormControl,
    parcelheightControl: new FormControl,
    parcelweightControl: new FormControl,
    parcelcontentControl: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.bs.getOne(this.id!)
      .then(response => {
        this.parcel = response
        this.form.patchValue({
          dateControl: this.parcel.date ? new Date(this.parcel.date).toISOString().split('T')[0] : '',
          platformControl: this.parcel?.platform,
          streetControl: this.parcel?.street,
          housenumberControl: this.parcel?.housenumber,
          plzControl: this.parcel?.plz,
          ortControl: this.parcel?.ort,
          firstNameControl: this.parcel?.firstname,
          lastNameControl: this.parcel?.lastname,
          parcelwidthControl: this.parcel?.parcelwidth,
          parcellengthControl: this.parcel?.parcellength,
          parcelheightControl: this.parcel?.parcelheight,
          parcelweightControl: this.parcel?.weightinkg,
          parcelcontentControl: this.parcel.parcelcontent
        })
        return this.parcel
      })
      .then(parcel => {
        if (!parcel.firstname) {
          this.router.navigate(['/table']);
        } else {
          console.log('parcel in DetailComponent:', parcel)
        }
      })
  }

  update() {
    const values = this.form.value;
    this.parcel.firstname = values.firstNameControl!;
    this.parcel.lastname = values.lastNameControl!;
    this.parcel.street = values.streetControl!;
    this.parcel.housenumber = values.housenumberControl!;
    this.parcel.plz = values.plzControl!;
    this.parcel.ort = values.ortControl!;
    this.parcel.platform = values.platformControl!;
    this.parcel.date = values.dateControl!;
    this.parcel.parcelwidth = values.parcelwidthControl!;
    this.parcel.parcellength = values.parcellengthControl!;
    this.parcel.parcelheight = values.parcelheightControl!;
    this.parcel.weightinkg = values.parcelweightControl!;
    this.parcel.parcelcontent = values.parcelcontentControl!;

    this.bs.update(this.id!, this.parcel)
      .then(() => this.router.navigate(['/table']))
  }

  cancel() {
    this.router.navigate(['/table'])
  }
}
