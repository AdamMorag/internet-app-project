import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent implements OnInit {

  @Input()
  public boardId: string;

  constructor() { }

  ngOnInit() {
  }  

  public shareToFacebook($event: Event) {
    $event.stopPropagation();    
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(`http://127.0.0.1/board/${this.boardId}`), 
      'facebook-share-dialog', 
      'width=626,height=436');
  }

  public shareToTwitter($event: Event) {
    $event.stopPropagation();
    window.open('https://twitter.com/share?ref_src=twsrc%5Etfw', null, 'width=626,height=436');
  }      
}
