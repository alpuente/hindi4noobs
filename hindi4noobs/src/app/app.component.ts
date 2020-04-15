import { Component, Input } from '@angular/core';
import { QueryserviceService} from './queryservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //@Input() vowels = ["अ", "आ", "इ", "ई", "उ", "ऊ","ऋ", "ए", "ऐ", "ओ", "औ"];
  @Input() vowels = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ"]
  @Input() kGroup = ["क", "ख", "ग", "घ", "ङ"];
  @Input() cGroup = ["च", "छ", "ज", "झ", "ञ"]
  @Input() Tgroup = ["ट", "ठ", "ड", "ढ", "ण"]
  @Input() tGroup = ["त", "थ", "द", "ध", "न"]
  @Input() pGroup = ["प", "फ", "ब", "भ", "म"]
  @Input() others = ["य", "र", "ल", "व", "श"]
  @Input() others2 = ["ष", "स", "ह"]
  @Input() others3 = ["ड़", "ढ़"]
  title = 'hindi4noobs';

  constructor(private queryService:QueryserviceService) { }

  toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
  async playAudio(data){
    //let audio = new Audio();
    //audio.src = data;
    //audio.load();
    //audio.play();
    const context = new AudioContext();
    var arrayBuf = this.toArrayBuffer(data);
    const buffer = await context.decodeAudioData(arrayBuf);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
  }

  getSound(letter) {
    console.log(letter);
    this.queryService.getLetter(letter);
    this.queryService.getLetter(letter).subscribe((response) => {
      if (typeof response["audioContent"] !== "undefined") {
        this.playAudio(response["audioContent"]["data"]);
      }
      });
  }
}