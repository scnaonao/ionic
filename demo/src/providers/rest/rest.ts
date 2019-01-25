import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
  /**
   *
   * 全局获取http请求的方法
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    let body: any = res.json();
    return JSON.parse(body) || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err: any = body.error || JSON.stringify(body);
      errMsg = '${ error.status } - ${ error.statusText} ' + err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }

  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }

  doRegister(mobile, nickname, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password);
  }

  getUserInfo(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?userID=" + userId);
  }

  uodateNickName(userId, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + '?userid=' + userId + '&nickname=' + nickname);
  };

  saveQuestion(userId, title, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave + '?userid=' + userId + '&title=' + title + '&content=' + content);
  }

  /*
    获取首页的Feeds流
  */
  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds);
  }

  /*
    发现模块：获取问题列表
  */
  getQuestions(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList);
  }

  /*
  加载问题详情页数据
  */
  getQuestion(id: string): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion + '?id=' + id);
  }
  /*
    加载问题详情, 传递questionid 和 userid 获取到当前用户有没有关注到此问题
    */
  getQuestionWithUser(questionId: string, userId: string): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + '?id=' + questionId + '&userid=' + userId);
  }

  saveFavourite(questionId: string, userId: string): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite + '?questionid=' + questionId + '&userid=' + userId);
  }

  answer(userId: string, questionId: string, content: string): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer + '?userid=' + userId + '&questionid=' + questionId + '&content=' + content);
  }
}
