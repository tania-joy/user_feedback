import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  UserForm;
  UploadFile: File;
  @ViewChild('UploadImg') Upload_Img;
  constructor(private http: HttpClient){
    this.UserForm = new FormGroup({
      name: new FormControl('anu'),
      email: new FormControl('aaa@bbb.com'),
      support_type: new FormControl('3'),
      subject: new FormControl('Test Subject'),
      desc: new FormControl('desc...'),
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

    let mailData = {
      name: formData.name,
      _replyto: formData.email,
      to: 'tania.joy@citrusinformatics.com',
      _subject: formData.subject,
      message: formData.desc,
      _confirmation: 'Mail Sent!'
   };

   let headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');

  
   this.http.post('https://mailthis.to/k.j.tania@gmail.com', mailData, {
    headers: headers
    }).map(res => res.json()).subscribe(
      data => {
        console.log('s:');
        console.log(data);
      },
      error => {
        console.log('e: ');
        console.log(error);
      }
    );
  }
}
