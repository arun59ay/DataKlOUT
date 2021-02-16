import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  @Output() deleteConfirmation = new EventEmitter();
  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

    // close the modal
    dismissModal() {
      this.activeModal.close();
    }
  
    delete() {
      this.deleteConfirmation.emit(true);
      this.activeModal.close();
    }

}
