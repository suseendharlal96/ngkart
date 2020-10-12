import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  isModalOpen: boolean = false;

  deleteProd() {
    this.isModalOpen = true;
  }
  edit(prod): void {
    this.isModalOpen = true;
  }
  addCart(prod): void {
    this.isModalOpen = true;
  }
  getModalCondition(): boolean {
    return this.isModalOpen;
  }
}
