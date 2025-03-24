import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewKycontractDetailsComponent } from '../view-kycontract-details/view-kycontract-details.component';
import { ContractDetails } from 'src/models/contract-rating.model';


@Component({
  selector: 'app-search-kycontracts',
  templateUrl: './search-kycontracts.component.html',
  styleUrls: ['./search-kycontracts.component.css'],
  providers: [DialogService]
})
export class SearchKycontractsComponent implements OnInit, OnDestroy {
  
  ref!: DynamicDialogRef;

  contracts = ContractDetails;

  constructor(private projectDialog: DialogService) { }

  search!:string;
  searchBy!:string;
  
  ngOnInit(): void {
  }

  viewProjectDetails(contractItems: any){
    this.ref = this.projectDialog.open(ViewKycontractDetailsComponent, {
      header: contractItems.projectName,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: {
        contract: contractItems
      }
    });
  }

  searchContract(){
    alert("Search functionality in progress.")
  }
  
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

}
