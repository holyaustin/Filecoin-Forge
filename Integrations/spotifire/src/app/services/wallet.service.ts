import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    connection$: Subject<boolean> = new Subject<boolean>();

    constructor() {}

    async connect(): Promise<boolean> {
        const ethereum = (window as any)?.ethereum;

        if (!ethereum?.isMetaMask) return null;
        await ethereum.enable();

        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length > 0) {
                localStorage.setItem('spotifire.wallet', accounts[0]);
                this.connection$.next(true);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    }

    async disconnect() {
        localStorage.removeItem('spotifire.wallet');
        window.location.reload();
    }

    getAddress() {
        return localStorage.getItem('spotifire.wallet');
    }
}
