import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert:boolean=false;
  error:any;
  success:any;
  try:any
  constructor(
    private auth:AuthService
    ) { }
    form=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      username:new FormControl('',[Validators.required]),
      mobile:new FormControl('',[Validators.required,Validators.minLength(13)]),
      city:new FormControl('',[Validators.required]),
      password:new FormControl('',Validators.required),
      cpassword:new FormControl('',[Validators.required]),
    });
  ngOnInit() {
    
  }
  
  onSubmit()
{
  this.auth.register(this.form.value).subscribe((result)=>{

    this.error=result;
    
    
  })
}

  
  

}
