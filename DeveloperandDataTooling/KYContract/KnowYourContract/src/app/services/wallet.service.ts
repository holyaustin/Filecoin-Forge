import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private connectedWallet!:string;

  constructor() { }

  async canWalletConnect(): Promise<boolean> {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    else {
      console.log('MetaMask is not installed!');
      alert("Please install Metamask")
      return false;
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId == 80001 || chainId == 3141){
      console.log("Polygon Mumbai/Filecoin Hyperspace connected"); 
    }
    else {
      console.log("Not connected to Mumbai");
      alert("Please switch to Mumbai testnet");
      return false;
    }

    return true;
  }

  async connectWallet(){

    const accounts = await window.ethereum.request(
      { 
        method: 'wallet_requestPermissions', 
        params: [
          {
            eth_accounts: {}
          }
        ] 
      }).catch((err:any) => {
          if (err.code === 4001) {
            console.log('Connection rejected.');
            return;
          } 
          else {
            console.error(err);
            return;
          }
      });
      this.connectedWallet = accounts[0].caveats[0].value[0]; 
      console.log(this.connectedWallet); 
  }

  getConnectedWallet() {
    return this.connectedWallet;
  }

}
