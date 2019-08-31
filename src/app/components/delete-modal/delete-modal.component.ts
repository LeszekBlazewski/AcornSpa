import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() modalHeader: string;

  @Input() modalBody: string;

  @Input() modalWarning: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
