import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-logs',
  templateUrl: './transaction-logs.component.html',
  styleUrls: ['./transaction-logs.component.scss']
})
export class TransactionLogsComponent implements OnInit {

  transactions: any;

  constructor() { }

  ngOnInit(): void {
    // var transactions = this._firestore.collection(`logs-${this._bundlrService.getAddress()}`).valueChanges().subscribe(trans => {
    //   this.transactions = trans.sort((a: any, b: any) => a.time > b.time ? -1 : 1);
    // }); 
  }

}
