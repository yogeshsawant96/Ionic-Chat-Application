import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetInfoService } from '../shared/get-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})
export class ChatBoxPage implements OnInit {
  tempaName = [];
  roomname: string;
  communication;
  newMessage: string;
  _email: string;
  TypingFlag;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(private getInfoService: GetInfoService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() 
  {
    this.getInfoService.typingDetails().subscribe((data) => {
      if (data.message == "none") {
        this.TypingFlag = false;
      }
      else {
        this.TypingFlag = true;
      }

      console.log(this.TypingFlag);
    });

    this.tempaName = this.getInfoService.oUSER;
    this._email = localStorage.getItem('email');
    this.route.paramMap.subscribe(param => {
      console.log(param['params'].room);
      this.roomname = param['params'].room;
    });
    this.getInfoService.getMessages(this.roomname).subscribe((data) => {
      this.communication = data;
      console.log(this.communication);
      this.content.scrollToBottom(0);
      // this.pRef.
    });

    this.getInfoService.newMessages().subscribe((data) => {
      this.communication.push(data);
      this.content.scrollToBottom(0);

    })
  }
  goBack() {
    this.router.navigate(['/friend-list']);
  }
  onKeydown(event) {
    window.alert('yogesh');

  }

  sendMessage() {
    const time = moment().format('hh:mm:ss a');
    this.getInfoService.sendMessage({ message: this.newMessage, time: time, room: this.roomname, user: this.tempaName['email'], from: this._email });
    // this.communication.push(this.newMessage);
    this.newMessage = '';
    this.getInfoService.userTyping({ room: this.roomname, message: "none" });

  }
  typing(sms) {
    
    if(sms.length>0){
      // console.log('typing');
      this.getInfoService.userTyping({ room: this.roomname, message: this.roomname });
    }else{
      // console.log('null');
      this.TypingFlag = false;
      this.getInfoService.userTyping({ room: this.roomname, message: "none" });
    }

  }

}