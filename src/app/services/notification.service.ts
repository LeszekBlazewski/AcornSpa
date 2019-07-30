import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { ToastrNotificationComponent } from '../components/toastr-notification/toastr-notification.component';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastrService: ToastrService) { }

    public showSuccessToastr(message: string, title: string) {
        const modalRef = this.toastrService.show(message, title, {
            timeOut: 3000,
            toastClass: 'alert success',
            tapToDismiss: true,
            positionClass: 'toast-bottom-right',
            toastComponent: ToastrNotificationComponent,
        })
        modalRef.toastRef.componentInstance.isSuccessAlert = true;
    }

    public showErrorToastr(message: string, title: string) {
        const modalRef = this.toastrService.show(message, title, {
            timeOut: 3000,
            toastClass: 'alert',
            tapToDismiss: true,
            positionClass: 'toast-bottom-right',
            toastComponent: ToastrNotificationComponent,
        })
        modalRef.toastRef.componentInstance.isSuccessAlert = false;
    }
}