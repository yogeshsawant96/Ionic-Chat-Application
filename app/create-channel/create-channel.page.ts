import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GetInfoService } from '../shared/get-info.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.page.html',
  styleUrls: ['./create-channel.page.scss'],
})
export class CreateChannelPage implements OnInit {

  constructor(private modalCtrl:ModalController,private fb:FormBuilder,
              private GetInfoService:GetInfoService,public loadingController: LoadingController) { }

  channelMemberFlag=false;
                
  channelName;
  allUsers=[];

  ngOnInit() 
  {
    this.GetInfoService.getusers().subscribe((data)=>{
      for(var i=0;i<data.length;i++)
      {
        this.allUsers.push({
          name:data[i].name,
          email:data[i].email,
          isChecked:false
        })
      }
    });
    
  }

  createChannel=this.fb.group({
    channel:['',Validators.required],
    user:[localStorage.getItem('email')]
  });


  close()
  {
    console.log('d');
    this.modalCtrl.dismiss(); 
    
  }
  saveChannel(channel) {
    // console.log(channel);
    this.channelName=channel['channel'];
    console.log(this.channelName);
    // this.channelMemberFlag=true; 
    this.GetInfoService.createChannels(channel).subscribe((res) => {
      console.log(res);
      if(res['message']="channel Created"){
        this.channelMemberFlag=true;
      }
    });
  }
  addUsers(){
    const array = [];
    // console.log(this.allUsers);
    for(var i=0;i<this.allUsers.length;i++){
        if(this.allUsers[i]['isChecked']) {
          array.push(this.allUsers[i]['email']);
        }
    }
    console.log(array);
    
    for(var i=0;i<array.length;i++){
      this.GetInfoService.insertUSerIntoChannels({channel:this.channelName,members:array[i]}).subscribe((res)=>{
        console.log("sucess Added users");      
      });
    }
    this.GetInfoService.refreshChannel({data:true});
    this.modalCtrl.dismiss(); 
    this.presentLoading();
  }
  async presentLoading()
   {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
}
