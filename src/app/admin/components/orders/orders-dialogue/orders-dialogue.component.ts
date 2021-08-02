import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-dialogue',
  templateUrl: './orders-dialogue.component.html',
  styleUrls: ['./orders-dialogue.component.css']
})
export class OrdersDialogueComponent implements OnInit {

  @Input() id: number = -1;
  @Input() status: string = "error";

  constructor() { }

  ngOnInit(): void {
  }

}
