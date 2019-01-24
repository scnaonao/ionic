import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, LoadingController, ActionSheetController, Platform, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

// 导入第三方库定义
declare var cordova: any;

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  public userId: any;
  public errorMessage: any;
  public lastImage: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public storage: Storage, public loadingCtrl: LoadingController, public rest: RestProvider, public file: File, public filePath: FilePath, public transfer: FileTransfer, public camera: Camera, public platform: Platform, public toastCtrl: ToastController, public viewCtrl: ViewController) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      this.userId = val;
    }

    )
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选取',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: '使用相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理 Android 图片的路径问题

      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        // android 手机从相册中获取图片
        this.filePath.resolveNativePath(imagePath)
          .then(FilePath => {
            // 获取正确的路径
            let correctPath = FilePath.substr(0, FilePath.lastIndexOf('/') + 1);
            // 获取正确的文件名
            let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          })
      } else {
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // 获取正确的文件名
        let correntName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, correntName, this.createFileName());

      }
    }, (err) => {
      super.showToast(this.toastCtrl, '选择图片出现错误，请在 App 中操作或者检查相关的权限');
    })
  }


  //图片另存为
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      super.showToast(this.toastCtrl, '存储图片出现错误');
    });

  }

  createFileName() {
    let d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

  // 处理图片的路径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  uploadImage() {
    let url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    let targetPath = this.pathForImage(this.lastImage);
    let filename = this.userId + '.jpg'; // 定义上传后的文件名
    // 上传参数
    let options = {
      filekey: 'fiel',
      filename: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'fileName': filename, 'userId': this.userId }
    };

    const FileTransfer: FileTransferObject = this.transfer.create();
    let loading = super.showLoading(this.loadingCtrl, '图片上传中...');

    // 开始正式上传
    FileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtrl, '图片上传成功');
      // 在用户看清楚弹窗提示后关闭页面
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000);
    }, err => {
      loading.dismiss();
      super.showToast(this.toastCtrl, '图片上传失败,请重试');
    });

  }
}
