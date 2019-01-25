import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public userinfo: Object;
  public pushPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // 演示目的，可以通过API接口获取数据库中的数据
    this.userinfo = {
      userid: "2312323",
      username: "慕课女神"
    }
    this.pushPage = ChatdetailsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
