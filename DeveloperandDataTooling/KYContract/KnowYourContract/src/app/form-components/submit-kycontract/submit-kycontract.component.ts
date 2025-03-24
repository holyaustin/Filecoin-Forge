import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WalletService } from 'src/app/services/wallet.service';
import { Categories } from 'src/models/categories.model';
import { NetworkOptions } from 'src/models/networks.model';
import { Router } from '@angular/router';
import { AESService } from 'src/app/services/aes.service';

@Component({
  selector: 'app-submit-kycontract',
  templateUrl: './submit-kycontract.component.html',
  styleUrls: ['./submit-kycontract.component.css']
})
export class SubmitKycontractComponent implements OnInit {
  
  kyContractForm = new FormGroup({
    submittorAddress: new FormControl(''),
    teamWallet: new FormControl(''),
    projectName: new FormControl(''),
    projectContractAddress: new FormControl(''),
    projectWebsite: new FormControl(''),
    projectLogo: new FormControl(''),
    projectDescription: new FormControl(''),
    projectCategory: new FormControl(''),
    network: new FormControl(''),
    sourceCode: new FormControl('')
  });

  categories = Categories;
  networkOptions = NetworkOptions;

  constructor(private wallet:WalletService, private router: Router, private encrypt: AESService) { }

  ngOnInit(): void {
    let _wallet = this.wallet.getConnectedWallet()
    if (!_wallet){
      alert("You need to connect your wallet to proceed")
      this.router.navigate(["/"])
    }
  }

  onSubmit(){
    console.log(typeof(this.kyContractForm.value))
    // this.encrypt.encrypt(this.kyContractForm.value)
  }

}
