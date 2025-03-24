import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogService } from './dialog.service';

declare var DatastoreService: any;

@Injectable({
    providedIn: 'root'
})
export class DatastoreLoaderService {
    isLoaded: boolean = false;
    load$: Subject<boolean> = new Subject<boolean>();

    constructor(private _dialogService: DialogService) {}

    async load(config: any) {
        const progressDialog = this._dialogService.startProgressDialog({
            progressMsg: 'Loading database...',
            progressIcon: 'sync',
            doneMsg: 'Database has been loaded successfully!',
            isProcessed: false,
            showDoneButton: false
        });

        await DatastoreService.initOrbitDB(config);

        this._dialogService.closeProgressDialog(progressDialog);

        this.isLoaded = true;
        this.load$.next(this.isLoaded);
    }
}
