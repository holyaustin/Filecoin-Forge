import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ProgressDialogData {
    progressMsg: string;
    doneMsg: string;
    isProcessed: boolean;

    progressIcon?: string;
    showDoneButton?: boolean;
}

@Component({
    selector: 'app-progress-dialog',
    templateUrl: './progress-dialog.component.html',
    styleUrls: ['./progress-dialog.component.scss']
})
export class ProgressDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ProgressDialogData) {
        if (!data.progressIcon) data.progressIcon = 'cloud_upload';
        if (data.showDoneButton == null) data.showDoneButton = true;
    }

    ngOnInit(): void {}
}
