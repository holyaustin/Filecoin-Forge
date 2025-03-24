import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CIDString, Web3Storage } from 'web3.storage';

@Injectable({
    providedIn: 'root'
})
export class Web3storageService {
    client: Web3Storage;

    constructor() {
        // Construct with token and endpoint
        this.client = new Web3Storage({
            token: environment.web3StorageToken
        });
    }

    async upload(files: File[]): Promise<CIDString> {
        const rootCid = await this.client.put(files);
        return rootCid;
    }
}
