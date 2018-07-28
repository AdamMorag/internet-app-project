import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){    
    let c = <HTMLCanvasElement>document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.lineWidth=10;
    ctx.strokeStyle = '#ffffff'
    ctx.moveTo(80, 20);
    ctx.lineTo(40, 75);    
    ctx.lineTo(20, 50);
    ctx.stroke();
  }

}
