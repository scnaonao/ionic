import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';
/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html'
})

// 实现接口
export class EmojipickerComponent implements ControlValueAccessor {

  public content: string;
  public emojiArray = [];
  public onChanged: Function;
  public onTouched: Function;

  constructor(emojiProvider: EmojiProvider) {
    this.emojiArray = emojiProvider.getEmojis();

  }

  writeValue(obj: any): void {
    this.content = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.setValue(this.content);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // 再次处理新的内容赋值以及函数的绑定
  setValue(val: any): any {
    this.content += val;
    if (this.content) {
      this.onChanged(this.content);
    }
  }



}
