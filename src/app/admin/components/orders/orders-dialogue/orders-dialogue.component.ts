import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-dialogue',
  templateUrl: './orders-dialogue.component.html',
  styleUrls: ['./orders-dialogue.component.css']
})
export class OrdersDialogueComponent implements OnInit {

  // @Input() id: number = -1;
  // @Input() status: string = "error";
  // @Output() statusChange: EventEmitter<[string, number]> = new EventEmitter();
  status: string = "";

  constructor(private dialogRef: MatDialogRef<OrdersDialogueComponent>) { }

  ngOnInit(): void {
  }

  handleSelect(status: any) {
    this.dialogRef.close()
    this.status = status;
    // this.statusChange.emit([status.target.value, this.id])
  }

  save() {
    console.log(this.status)
  }

  close() {
    this.dialogRef.close()
  }

}
