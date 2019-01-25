import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage'
import { AnswerPage } from '../../pages/answer/answer';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

  public id: string;
  public userId: string;
  public question: string[];
  public answers: string[];
  public errorMessage: any;
  public isFavourite: boolean = false;
  public isMyQuestion: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public rest: RestProvider, public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    super();
  }

  ionViewDidLoad() {
    // 获取传递过来的参数
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id: string) {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
        let loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getQuestionWithUser(id, val)
          .subscribe(
            f => {
              this.question = f;
              this.answers = f['Answers'];
              this.isFavourite = f['IsFavourite'];
              this.isMyQuestion = (f['OwnUserId'] == val);
            },
            error => this.errorMessage = <any>error);
      } else {
        this.showToast(this.toastCtrl, '请登录后，查看');
      }
    })

  }

  saveFavourite() {
    let loading = super.showLoading(this.loadingCtrl, '提交中...');
    this.rest.saveFavourite(this.id, this.userId)
      .subscribe(
        f => {
          if (f['Status'] == 'OK') {
            loading.dismiss();
            super.showToast(this.toastCtrl, this.isFavourite ? '取消关注成功' : '关注问题成功');
            this.isFavourite = !this.isFavourite;
          }
        }, error => this.errorMessage = <any>error);
  }

  showAnswerPage() {
    let modal = this.modalCtrl.create(AnswerPage, { id: this.id });
    // 关闭后的回调---刷新
    modal.onDidDismiss(() => {
      this.loadQuestion(this.id);
    });
    modal.present();

  }

}
