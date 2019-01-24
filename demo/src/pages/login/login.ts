import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  public mobile: any;
  public password: any;
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public rest: RestProvider, public toastCtrl: ToastController, public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loading = super.showLoading(this.loadingCtrl, "登陆中");
    this.rest.login(this.mobile, this.password).subscribe(
      f => {
        if (f["Status"] == "OK") {
          //处理登录成功的逻辑
          this.storage.set('UserId', f['UserId']);
          loading.dismiss();
          this.dismiss();
        } else {
          loading.dismiss();
          super.showToast(this.toastCtrl, f["StatusContent"]);
        }
      },
      error => this.errorMessage = <any>error);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  pushRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
