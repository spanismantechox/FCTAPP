import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ok-message',
  templateUrl: './ok-message.component.html'
})
export class OkMessageComponent implements OnInit {
  @Input() message: string;
  constructor() { }
  
  ngOnInit() {
  }

}
