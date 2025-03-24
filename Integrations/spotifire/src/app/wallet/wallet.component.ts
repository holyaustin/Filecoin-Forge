import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../services/wallet.service';
import { DatastoreLoaderService } from '../services/datastore-loader.service';

declare var DatastoreService: any;

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
    @ViewChild('walletDialogRef') walletDialogRef: TemplateRef<any>;
    @ViewChild('connectDialogRef') connectDialogRef: TemplateRef<any>;

    bunlderAddress: string = null;
    address: string = null;
    shortAddress: string = null;

    ipfsId: string = null;

    constructor(
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _walletService: WalletService,
        private _datastoreLoaderService: DatastoreLoaderService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.loadWalletInfo();

        this._datastoreLoaderService.load$.subscribe(() => {
            this.ipfsId = DatastoreService.ipfsId;
        });
        if (this._datastoreLoaderService.isLoaded) this.ipfsId = DatastoreService.ipfsId;
    }

    async connect() {
        const isConnected = await this._walletService.connect();

        if (isConnected) {
            this.loadWalletInfo();
            this._snackBar.open(`Connected wallet ${this.address}`, null, { duration: 3000, panelClass: ['snackbar-success'] });
        } else {
            this._snackBar.open(`Cannot connect wallet`, null, { duration: 3000, panelClass: ['snackbar-success'] });
        }
    }

    async disconnect() {
        localStorage.removeItem('spotifire.wallet');
        window.location.reload();
    }

    async loadWalletInfo() {
        const walletAddr = this._walletService.getAddress();
        if (walletAddr) {
            this.address = walletAddr;
            this.shortAddress = `${this.address.substring(0, 6)}...${this.address.substring(this.address.length - 4)}`;
        }
    }

    openWalletDialog() {
        this._dialog.open(this.walletDialogRef);
    }

    openConnectDialog() {
        this._dialog.open(this.connectDialogRef);
    }
}
