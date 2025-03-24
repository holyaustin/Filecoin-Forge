import { Component } from '@angular/core';
import { WalletService } from './services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KnowYourContract';
  wallet!:string;
  walletButtonDisplay: string = "Connect Wallet";
  walletConnected:boolean = false;
  loading: boolean = false;

  constructor(private walletService: WalletService){}

  async connectWallet(){
    this.loading = true;
    await this.walletService.canWalletConnect().then(async (result:boolean)=>{
      if(result){
        await this.walletService.connectWallet().then(()=>{
          let _wallet = this.walletService.getConnectedWallet();
          if (_wallet) {
            this.wallet = _wallet;
            this.walletConnected = true;
            this.walletButtonDisplay = this.truncacteWallet(this.wallet)
          }
          this.loading = false;
        })
      }
      else {
        alert("Could not connect to wallet");
      }
    });
    this.loading = false;
  }

  submitKYC(){
    console.log(this.walletConnected);
  }

  truncacteWallet(wallet:string) {
    let firstFiveChars = wallet.slice(0,6)
    let lastFourChars = wallet.slice(-5);
    const truncated = firstFiveChars+"..."+lastFourChars
    return truncated;
  }
}
