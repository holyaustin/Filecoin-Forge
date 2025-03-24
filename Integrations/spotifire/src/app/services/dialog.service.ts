import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ProgressDialogComponent, ProgressDialogData } from '../dialogs/progress-dialog/progress-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private _progressDialogData: ProgressDialogData;

    constructor(private dialog: MatDialog) {}

    confirmDialog(data: ConfirmDialogData): Observable<boolean> {
        return this.dialog
            .open(ConfirmDialogComponent, {
                data,
                width: '400px',
                disableClose: true
            })
            .afterClosed();
    }

    startProgressDialog(data: ProgressDialogData): MatDialogRef<ProgressDialogComponent> {  
        this._progressDialogData = data;
        this._progressDialogData.isProcessed = true;
        const dialogRef = this.dialog.open(ProgressDialogComponent,{  
            disableClose: true ,  
            data: this._progressDialogData
        });  
        return dialogRef;  
      };  
  
    stopProgressDialog(){  
        this._progressDialogData.isProcessed = false;
        //ref.close();  
    }  

    closeProgressDialog(ref: MatDialogRef<ProgressDialogComponent>){  
        this._progressDialogData.isProcessed = false;
        setTimeout(()=> {ref.close()}, 1000)
         
    } 
}
