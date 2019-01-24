import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../../pages/details/details';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  public feeds: string[];
  public errorMessage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public LoadingCtrl: LoadingController, public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getFeeds();
  }
  gotoQuestion() {
    let modal = this.modalCtrl.create(QuestionPage);
    modal.present();

  }

  gotoChat() {
    this.selectTab(2);
  }

  // 代码控制tab选择
  selectTab(index: number) {
    let t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getFeeds() {
    let loading = super.showLoading(this.LoadingCtrl, '数据加载中...');
    this.rest.getFeeds()
      .subscribe(
        f => {
          this.feeds = f;
          loading.dismiss();
        },
        error => this.errorMessage = error);
  }

  gotoDetails(questionId: string) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }
}
