import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetInfoService } from '../shared/get-info.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private fb:FormBuilder,private router:Router,
              private GetInfoSerevice:GetInfoService,public alertController: AlertController) { }

  ngOnInit() {
  }

  signUp=this.fb.group({
    name:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })
  goBack(){
    this.router.navigate(['/dash-board']);
  }
  signup(data){
    console.log(data);
    this.signUp.reset();
    this.GetInfoSerevice.SignUp(data).subscribe((res)=>{
      // console.log(res);
      if(res[name]){
        this.router.navigate(['/dash-board']);
      }
      else if(res['allready']==true){
        // window.alert('all ready an user');
        this.presentAlert();
      }  
    }); 
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Already have a user',
      subHeader: 'Try another email..!',
      message: 'Email is Already in use please check another',
      buttons: [{text:'Retry',handler:()=>{ this.signUp.reset(); }}]
    });
    
    
    
    

    await alert.present();
  }

}
