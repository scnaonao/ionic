import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { DetailsPage } from '../../pages/details/details';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  public questions: string[];
  public errorMessage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public LoadingCtrl: LoadingController, public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  // 代码控制tab选择
  selectTab(index: number) {
    let t: Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getQuestions() {
    let loading = super.showLoading(this.LoadingCtrl, '数据加载中...');
    this.rest.getQuestions()
      .subscribe(
        f => {
          this.questions = f;
          loading.dismiss();
        },
        error => this.errorMessage = error);
  }

  doRefresh(refresher: any) {
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(questionId: string) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}
