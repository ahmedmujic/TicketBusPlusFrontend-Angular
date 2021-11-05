import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoService } from 'src/app/core/services/info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  infoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private infoService: InfoService) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });

  }

  get form() {
    return this.infoForm.value;

  }

  submit(e){
    e.preventDefault();
    this.infoService.sendInfoEmail({email: this.form.email, fullName: this.form.fullName, message: this.form.message, phone: this.form.phone}).subscribe(_=> {

    });
  }


}
