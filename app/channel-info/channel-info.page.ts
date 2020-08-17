import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GetInfoService } from '../shared/get-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.page.html',
  styleUrls: ['./channel-info.page.scss'],
})
export class ChannelInfoPage implements OnInit {

  constructor(private modalCtrl:ModalController,private GetInfoService:GetInfoService,private route:Router) { }
  Currentchannel;
  ngOnInit()
  {
    
    this.Currentchannel=this.GetInfoService.oChannel;
    console.log(this.Currentchannel);
    
  }

  DeleteChannel(){
    console.log({channel:this.Currentchannel.channel,members:localStorage.getItem('email')});
    this.GetInfoService.removeUSerFromChannels({channel:this.Currentchannel.channel,members:localStorage.getItem('email')}).subscribe(()=>{
      console.log('Account Removed SuccessFull');
      this.modalCtrl.dismiss();      
    });
  }

  close()
  {
    console.log('d');
    this.modalCtrl.dismiss();  
  }
}
