import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-view-kycontract-details',
  templateUrl: './view-kycontract-details.component.html',
  styleUrls: ['./view-kycontract-details.component.css'],
})
export class ViewKycontractDetailsComponent implements OnInit {

  _project:any;

  constructor(private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this._project = this.dialogConfig.data.contract;
  }

}
