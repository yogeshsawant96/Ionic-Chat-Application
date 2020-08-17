import { Component, OnInit, ViewChild } from '@angular/core';
import { GetInfoService } from '../shared/get-info.service';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { PopoverController } from '@ionic/angular';
import { PopOverPage } from '../pop-over/pop-over.page';
import { ModalController } from '@ionic/angular';
import { ChannelInfoPage } from '../channel-info/channel-info.page';


@Component({
  selector: 'app-channel-chat',
  templateUrl: './channel-chat.page.html',
  styleUrls: ['./channel-chat.page.scss'],
})
export class ChannelChatPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;

  newMessage: string = '';
  Communication;
  typingFlag: boolean;
  typingUserName: String;

  constructor(private getInfoService: GetInfoService,public popoverController: PopoverController,
              public modalController: ModalController) {


  }

  currentChannel;
  currentUsername;

  ngOnInit()
  {
    
    this.getInfoService.memberChanneltypingDetails().subscribe((data)=>{
      console.log("sss");
      if(data.message=="none")
      {
        this.typingFlag=false;
      }
      else{
        this.typingFlag=true;
        this.typingUserName=data['user'];
      }
      
    });


    this.currentChannel = this.getInfoService.getCurrentChannel();
    this.currentUsername = localStorage.getItem('name');
    this.getInfoService.joinRoom({room:this.currentChannel.channel});
    this.getInfoService.getChannelMessages({ room: this.currentChannel.channel }).subscribe((data) => {
      this.Communication = data;
      console.log(this.Communication);
      this.content.scrollToBottom(500);

    });

    this.getInfoService.newChannelMessages().subscribe((data) => {
      this.Communication.push(data);
      this.content.scrollToBottom(0);

    });

  }

  sendMessage() {
    const time = moment().format('hh:mm:ss a');

    this.getInfoService.sendChannelMessage({ message: this.newMessage, time: time, room: this.currentChannel.channel, user: this.currentUsername });

    this.newMessage = '';
    this.getInfoService.channelMemberTyping({room:this.currentChannel.channel,user:this.currentUsername,message:"none"});
  }
  onKeydown($event) {
    if (this.newMessage.length > 0) {
      console.log(this.newMessage);
      this.sendMessage();
      this.newMessage = '';
    }
  }
  MemberTyping(sms)
  {
    
    if(sms.length>0){
      // console.log('typing');
      this.getInfoService.channelMemberTyping({room:this.currentChannel.channel,user:this.currentUsername,message:this.newMessage});
    }else{
      // console.log('null');
      // this.TypingFlag = false;
      this.getInfoService.channelMemberTyping({room:this.currentChannel.channel,user:this.currentUsername,message:"none"});
    }
  }
  openPop(event){
    this.presentPopover(event);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopOverPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  openInfo(){
    this.presentModal(); 
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ChannelInfoPage
    });
    return await modal.present();
  }
}
