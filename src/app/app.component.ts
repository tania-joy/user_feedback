import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { email } from '../../node_modules/emailjs/email';
/* const email = require("../../node_modules/emailjs/email"); */
/* import { email } from 'emailjs';*/
import { crypto } from 'crypto-js'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  server;
  message;
  UserForm;
  UploadFile: File;
  @ViewChild('UploadImg') Upload_Img;
  constructor(){
    this.UserForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      support_type: new FormControl('-1'),
      subject: new FormControl(''),
      desc: new FormControl(''),
      UploadImg: new FormControl()
    });
  }

  onSubmit = function(formData) {
    console.log(formData.name);
    console.log(formData.email);
    console.log(formData.support_type);
    console.log(formData.subject);
    console.log(formData.desc);
    
    const img = this.Upload_Img.nativeElement;
    if(img.files && img.files[0]) {
      this.UploadFile = img.files[0];
    }
    const UploadedFile: File = this.UploadFile;
    console.log('UploadedFile');
    console.log(UploadedFile);

    this.server = email.server.connect({
        user:	"k.j.tania@gmail.com", 
        password:"citrus12345", 
        host:	"smtp.gmail.com", 
        ssl: true
    });

    this.message	= {
      text:	formData.desc, 
      from:	"you <tania@gmail.com>", 
      to:		formData.email,
      subject:	formData.subject,
      attachment: 
      [
         {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
         {path: UploadedFile.webkitRelativePath, type: UploadedFile.type, name: UploadedFile.name}
      ]
   }; 
   console.log('mail send!');
  /*  this.server.send(this.message, function(err, message) { console.log(err || message); }); */
   
  

  }
}
