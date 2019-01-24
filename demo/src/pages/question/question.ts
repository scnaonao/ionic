import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  public title: string;
  public content: string;
  public errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController, public rest: RestProvider, public storage: Storage, public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadingCtrl, '提交中...');
        this.rest.saveQuestion(val, this.title, this.content)
          .subscribe(f => {
            if (f['Status'] == 'OK') {
              loading.dismissAll;
              this.dismiss();
            } else {
              loading.dismissAll();
              super.showToast(this.toastCtrl, f['StatusContent']);
            }
          },
            error => this.errorMessage = <any>error);
      }
      else {
        super.showToast(this.toastCtrl, '请登录后提交提问...');
      }
    }

    )
  }
}
