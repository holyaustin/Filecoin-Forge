import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-objection',
  templateUrl: './submit-objection.component.html',
  styleUrls: ['./submit-objection.component.css']
})
export class SubmitObjectionComponent implements OnInit {

  objectionForm = new FormGroup({
    submittorAddress: new FormControl(''),
    projectContractAddress: new FormControl(''),
    objection: new FormControl(''),
    supportingDocs: new FormControl(''),
  });

  constructor(private wallet: WalletService, private router: Router) { }

  ngOnInit(): void {
    let _wallet = this.wallet.getConnectedWallet()
    if (!_wallet){
      alert("You need to connect your wallet to proceed")
      this.router.navigate(["/"])
    }
  }

  onSubmit() {
    throw new Error('Method not implemented.');
    }

}
