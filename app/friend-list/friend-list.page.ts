import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GetInfoService } from '../shared/get-info.service';
import { CreateChannelPage } from '../create-channel/create-channel.page';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.page.html',
  styleUrls: ['./friend-list.page.scss'],
})
export class FriendListPage implements OnInit {
  roomname: string;
  Channels: Object;
  _id: string;
  _email: string;
  allEmails = [];
  allLastSms = [];
  currentUserChannels = [];
  noSmsFlag = false;
  newusers: any[];
  count: any;
  CHatRoomSMS: string;

  constructor(public alertController: AlertController, private router: Router,
    public modalController: ModalController, private getInfoServ: GetInfoService,
    public toastController: ToastController,private localNotifications: LocalNotifications,private platform:Platform) {

  }




  searchFlag = false; //FLAG FOR SEARCH
  oUser;
  currentUserEmail;
  temperoryMessage;
  ngOnInit() {

    this.reload();

    this._id = localStorage.getItem('id');
    this._email = localStorage.getItem('email');

    this.getInfoServ.getusers().subscribe((data) => {
      // this.oUser = data;
      this.getSubscribedChannels();
      console.log(this.oUser);

      this.getLastMessage();

      for (var i = 0; i < data.length; i++) {
        if (this._email != this.oUser[i]['email']) {
          if (this._email.length > this.oUser[i]['email'].length) {
            this.allEmails.push(this._email + this.oUser[i]['email']);
          } else {
            this.allEmails.push(this.oUser[i]['email'] + this._email);
          }
        }
      }

 

      for (let i = 0; i < this.allEmails.length; i++) {
        this.getInfoServ.getLastSms(this.allEmails[i]).subscribe((data) => {
          if (data != null) {
            this.allLastSms.push(data);
          }
        });
        

      }

      // console.log(this.allLastSms);

      this.reload();
      // console.log(data);
    });

    this.getInfoServ.ChannelCreatedDetails().subscribe((data) => {
      // console.log(data);
      this.getInfoServ.getChannels().subscribe((res) => {
        this.Channels = res;
        console.log(this.Channels);
        this.reload();
        console.log(this.currentUserChannels);
      });


    });

    this.getInfoServ.getChannels().subscribe((res) => {
      this.Channels = res;
      console.log(this.Channels);
    });

    this.getInfoServ.offlineDetails().subscribe((data) => {
      console.log('offline');
      this.getInfoServ.getChannels().subscribe((res) => {
        this.Channels = res;
        // console.log(this.Channels);
        this.reload();
      });
    });

    this.getInfoServ.onlineAllDetails().subscribe((data) => {
      console.log('All online');
      this.reload();
    });

    this.getInfoServ.sms().subscribe((data) => {
      console.log(data);
      if (data.user == this._email)
       {
        this.presentToast(data);
        // window.alert(data.message);
        this.getInfoServ.getusers().subscribe((data) => {
          // this.oUser = data;
          console.log(this.oUser);          
          this.getLastMessage();
        });
        this.smsAlert(data);
      }
    });

  }

  reload() {
    this.currentUserEmail = localStorage.getItem('email');
    this.getInfoServ.getusers().subscribe((data) => {
      this.oUser = data;
      this.getLastMessage();
      this.getSubscribedChannels();
    });
    this.getInfoServ.getChannels().subscribe((res) => {
      this.Channels = res;
      // console.log(this.Channels);
    });
  }
  getSubscribedChannels() {
    this.currentUserChannels = [];
    for (var i = 0; i < this.oUser.length; i++) {
      if (this.oUser[i].email == this._email) {
        for (var j = 0; j < this.oUser[i].channel.length; j++) {
          this.currentUserChannels.push(this.oUser[i].channel[j]);
        }
        // console.log(this.currentUserChannels);
      }
    }
  }
  //SEARCH TOGGLE FLAG FUNCTION
  search() {
    if (this.searchFlag == false) {
      this.searchFlag = true;
    } else {
      this.searchFlag = false;
    }
  }

  //USER LOGOUT FUNCTION
  logout() {
    this.presentAlert();
    
    // console.log("alsjhd ");

  }

  selectUSer(user) {
    // console.log(user);
    this.getInfoServ.callclickuser(user);

    const email1 = localStorage.getItem('email')
    const email2 = user.email;
    // console.log(email1,email2);
    if (email1.length >= email2.length) {
      this.roomname = email1 + email2
      this.getInfoServ.joinRoom({ room: this.roomname })

    }
    else {
      this.roomname = email2 + email1
      this.getInfoServ.joinRoom({ room: this.roomname })
    }
    this.router.navigate(['/chat-box/', this.roomname]);

  }
  selectChannel(data) {
    this.getInfoServ.callclickChannel(data);
    this.router.navigate(['/channel-chat']);
  }

  //LOG OUT ALERT
  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Log Out',
      message: 'Are you sure..?',
      buttons: [{
        text: 'Log out', handler: () => {
          this.getInfoServ.userLogOut({ _id: this._id });
          this.router.navigate(['/dash-board']);
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
        }
      },
      { text: 'Cancel', handler: () => { this.router.navigate(['/friend-list']); } }]
    });
    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateChannelPage
    });
    return await modal.present();
  }

  createChannel() {
    console.log('create channel');
    this.presentModal();
  }
  returnSms(room) {

    this.getInfoServ.getLastSms(room).subscribe((data => {
      console.log(data);

    }));


  }

  getLastMessage() {
    this.newusers = [];
    this.oUser.forEach(element => {
      this.count++;
      if (element.email != this._email) {
        if (this._email.length > element.email.length) {
          this.CHatRoomSMS = (this._email + element.email);
        } else {
          this.CHatRoomSMS = (element.email + this._email);
        }
        // this.authService.joinRoom(this.chatroom);
        this.getInfoServ.getLastSms(this.CHatRoomSMS).subscribe((res) => {
          if (res != null) {
            this.newusers.push({
              _id: element._id,
              name: element.name,
              from: this._email,
              email: element.email,
              status: element.status,
              channel: element.channel,
              time: res['time'],
              message: res['message']
            })

          }
          else {
            this.newusers.push({
              _id: element._id,
              name: element.name,
              from: this._email,
              email: element.email,
              status: element.status,
              channel: element.channel,
              time: null,
              message: null
            })

          }

          // console.log(res);
        })
      }
    })
    // console.log(this.newusers);
  }
  async presentToast(sms) {
    const toast = await this.toastController.create({
      header: sms.sender,
      color: 'success',
      message: sms.message,
      duration: 2000,
      position:'top',
      mode:'ios',
      animated:true
    });
    toast.present();
  }
  smsAlert(sms){
    this.platform.ready().then(()=>{
      this.localNotifications.schedule({
        id: 1,
        text: sms.message,
        sound:'assets/sms.mp3',
        data: { secret: 'key' }
      });
    });
  }

}
