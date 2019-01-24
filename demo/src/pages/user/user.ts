import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { HeadfacePage } from '../../pages/headface/headface';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  public headface: string;
  public userinfo: string[];
  public nickname: string = '加载中...';
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public LoadingCtrl: LoadingController, public rest: RestProvider, public ToastCtrl: ToastController, public ViewCtrl: ViewController) {
    super();
  }

  ionViewDidLoad() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) { //加载个人信息
        let loading = super.showLoading(this.LoadingCtrl, '加载中...');
        this.rest.getUserInfo(val).subscribe(
          userinfo => {
            this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
            this.nickname = userinfo['UserNickName'];

          },
          error => this.errorMessage = <any>error)
        loading.dismiss();
      }
    }

    )
  }
  uodateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.LoadingCtrl, '修改中...');
        this.rest.uodateNickName(val, this.nickname)
          .subscribe(
            f => {
              if (f['Status'] == 'OK') {
                loading.dismiss();
                super.showToast(this.ToastCtrl, f['StatusContent']);
              } else {
                loading.dismiss();
                super.showToast(this.ToastCtrl, f['StatusContent']);
              }
            },
            error => this.errorMessage = <any>error)
      }
    }

    )

  }

  logout() {
    this.storage.remove('UserId');
    this.ViewCtrl.dismiss();
  }
  gotoHeadface() {
    this.navCtrl.push(HeadfacePage);
  }

}
