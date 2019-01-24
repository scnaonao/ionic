import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage extends BaseUI {

  public mobile: any;
  public nickname: any;
  public password: any;
  public confirmPassword: any;
  public errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public rest: RestProvider, public ToastCtrl: ToastController, public loadingCtrl: LoadingController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  gotoLogin() {
    this.navCtrl.pop();
  }

  doRegister() {
    //正则表达式判断手机号码是否正确
    if (!(/^1[345678]\d{9}$/.test(this.mobile))) {
      super.showToast(this.ToastCtrl, "手机号码不正确");
    } else if (this.password != this.confirmPassword) {
      super.showToast(this.ToastCtrl, "两次输入的密码不一致");

    } else {
      let Loading = super.showLoading(this.loadingCtrl, "注册中......");

      this.rest.doRegister(this.mobile, this.nickname, this.password).subscribe(
        f => {
          if (f['Status'] == 'OK') {
            Loading.dismiss();
            this.dismiss();
          } else {
            Loading.dismiss();
            super.showToast(this.ToastCtrl, f['StatusContent']);
          }
        },
        error => this.errorMessage = <any>error);
    }
  }
}
