import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../../pages/user/user';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  public headface: string;
  public userinfo: string[];
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage, public loadingCtrl: LoadingController, public rest: RestProvider) {
    super();
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    //modal关闭后的回调
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });
    modal.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) { //加载用户信息
        let Loading = super.showLoading(this.loadingCtrl, "数据加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userinfo = userinfo;
              this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
              this.notLogin = false;
              this.logined = true;
              Loading.dismiss();
            },
            error => this.errorMessage = <any>error
          )

      } else {
        this.notLogin = true;
        this.logined = false;
      }
    })
  }

  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

}
