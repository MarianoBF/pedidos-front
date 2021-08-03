import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-orders-dialogue',
  templateUrl: './orders-dialogue.component.html',
  styleUrls: ['./orders-dialogue.component.css']
})
export class OrdersDialogueComponent implements OnInit {

  @Input() id: number = -1;
  @Input() status: string = "error";
  @Output() statusChange: EventEmitter<[string, number]> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleSelect(status: any) {
    this.statusChange.emit([status.target.value, this.id])
  }

}
