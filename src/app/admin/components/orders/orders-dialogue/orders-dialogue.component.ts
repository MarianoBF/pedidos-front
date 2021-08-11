import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-dialogue',
  templateUrl: './orders-dialogue.component.html',
  styleUrls: ['./orders-dialogue.component.css']
})
export class OrdersDialogueComponent implements OnInit {
  status: string = "";

  constructor(private dialogRef: MatDialogRef<OrdersDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, status: string}) { }

  ngOnInit(): void {
  }

  handleSelect(status: any) {
    this.status = status.target.value;
  }

  save() {
    this.dialogRef.close(this.status)
  }

  close() {
    this.dialogRef.close()
  }

}
