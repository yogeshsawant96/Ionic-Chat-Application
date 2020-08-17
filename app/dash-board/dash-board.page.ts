import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule,FormGroup}from '@angular/forms';
import { GetInfoService } from '../shared/get-info.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.page.html',
  styleUrls: ['./dash-board.page.scss'],
})
export class DashBoardPage implements OnInit {

  constructor(private router:Router,private fb:FormBuilder,private getInfoService:GetInfoService,
              private http:HttpClient,public alertController: AlertController,public loadingController: LoadingController) { }
  dbUrl = "http://localhost:5000/users/";

    // sohamsawant@gmail.com   soham@123
  loginForm=this.fb.group({
    email:['sohamsawant@gmail.com',Validators.required],
    password:['soham@123',Validators.required]
  });

  ngOnInit() 
  {
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging In Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  login(data){
    this.getInfoService.get(data).subscribe((data)=>{
      console.log(data);
      if(!data['error'])
      {
        this.presentLoading();
        localStorage.setItem('id',data['user']['_id']);
        localStorage.setItem('email',data['user']['email']);
        localStorage.setItem('name',data['user']['name']);
        this.loginForm.reset();
        this.getInfoService.onlineDetails({data:'online'});
        this.router.navigate(['/friend-list']);
      }
      else{
        console.log("not a user");
        this.presentAlert();
      }
    });
    // console.log(data);
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Failed..!',
      subHeader: 'Invalid User',
      message: 'Entered E-mail and Password is not matched',
      buttons: [{text:'Retry',handler:()=>{ this.loginForm.reset(); }},
                {text:'Exit',role:"Exit",handler:()=>{console.log('Sign Up')}}]
    });
    
    
    
    

    await alert.present();
  }

  gotoSignUp(){
    this.router.navigate(['/signup']);
  }

}
