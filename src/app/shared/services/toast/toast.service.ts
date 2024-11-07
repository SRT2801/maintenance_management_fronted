import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _messageService: MessageService) { }

  showSuccess(summary: string, detail: string){
    this._messageService.add({severity: 'success', summary, detail})
  }

  showError(summary: string, detail: string) {
    this._messageService.add({ severity: 'error', summary, detail });
}

showInfo(summary: string, detail: string) {
    this._messageService.add({ severity: 'info', summary, detail });
}

showWarning(summary: string, detail: string) {
    this._messageService.add({ severity: 'warn', summary, detail });
}
}
