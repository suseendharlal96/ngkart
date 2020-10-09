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
    console.log('edit', this.isModalOpen);
  }
  addCart(prod): void {
    this.isModalOpen = true;
  }
  getModalCondition(): boolean {
    console.log(1, this.isModalOpen);
    return this.isModalOpen;
  }
}
