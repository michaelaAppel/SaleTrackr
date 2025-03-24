import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Parcel } from '../shared/parcel';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private bs = inject(BackendService)
  private router = inject(Router)
  parcel: Parcel = { id: 0, firstname: '', lastname: '', street: '', housenumber: '', plz: '', ort: '', parcelwidth: 0, parcellength: 0, parcelheight: 0, weightinkg: 0, parcelcontent: '', date: new Date(2025, 0, 1), platform: 'kleinanzeigen' }
  saved: boolean = false;

  form = new FormGroup({
    dateControl: new FormControl,
    platformControl: new FormControl<string>(''),
    streetControl: new FormControl<string>(''),
    housenumberControl: new FormControl<string>(''),
    plzControl: new FormControl<string>(''),
    ortControl: new FormControl<string>(''),
    firstNameControl: new FormControl<string>(''),
    lastNameControl: new FormControl<string>(''),
    widthControl: new FormControl(''),
    lengthControl: new FormControl(''),
    heightControl: new FormControl(''),
    parcelweightControl: new FormControl,
    parcelcontentControl: new FormArray([])
  });

  constructor(private fb: FormBuilder) {
    this.addParcelContentControl();
  }

  get parcelcontentControl(): FormArray {
    return this.form.get('parcelcontentControl') as FormArray;
  }

  addParcelContentControl(): void {
    this.parcelcontentControl.push(new FormControl<string>(''));
  }

  removeParcelContentControl(index: number): void {
    this.parcelcontentControl.removeAt(index);
  }

  create(): void {
    const values = this.form.value;
    this.parcel.firstname = values.firstNameControl!;
    this.parcel.lastname = values.lastNameControl!;
    this.parcel.street = values.streetControl!;
    this.parcel.housenumber = values.housenumberControl!;
    this.parcel.plz = values.plzControl!;
    this.parcel.ort = values.ortControl!;
    this.parcel.parcelwidth = parseFloat(values.widthControl!);
    this.parcel.parcellength = parseFloat(values.lengthControl!);
    this.parcel.parcelheight = parseFloat(values.heightControl!);
    this.parcel.weightinkg = values.parcelweightControl!;
    this.parcel.parcelcontent = this.parcelcontentControl.value.join(', ');
    this.parcel.date = values.dateControl!;
    this.parcel.platform = values.platformControl!;
    if (this.parcel.firstname != "" && this.parcel.lastname != "" && this.parcel.platform != "") {
      this.bs.createOne(this.parcel)
        .then(() => this.saved = true)
    }
    this.forward();
  }

  forward(): void {
    this.router.navigate(['/table'])
  }

}
