import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerOrdersDataService } from '../services';
import { CustomerVm } from './customer-vm';
import { VmCustomerDetailsComponent } from './vm-customer-details.component';
import { VmCustomerListComponent } from './vm-customer-list.component';
import { NgIf, AsyncPipe } from '@angular/common';

/**
 * Master/Detail following the Container/Presenter pattern.
 * Master: customer list of Customer ViewModels
 * Detail: detail about a selected Customer ViewModel
 */
@Component({
    selector: 'app-vm-container',
    styleUrls: ['../view-model.css'],
    template: `
    <button (click)="addCustomer()" class="btn btn-primary button-row">Add Customer</button>

    <div *ngIf="vms$ | async as vms" class="row">
      <!-- Customer List -->
      <div class="col-md-2">
        <app-vm-customer-list [vms]="vms" (selected)="selected($event)"></app-vm-customer-list>
      </div>

      <!-- Customer Detail -->
      <div class="col-md-5">
        <app-vm-customer-details [vm]="selectedVm" (cancel)="cancel()" (save)="save($event)"></app-vm-customer-details>
      </div>
    </div>
  `,
    standalone: true,
    imports: [NgIf, VmCustomerListComponent, VmCustomerDetailsComponent, AsyncPipe]
})
export class VmContainerComponent {
  vms$!: Observable<CustomerVm[]>;
  selectedVm: CustomerVm | null = null;

  constructor(private dataService: CustomerOrdersDataService) {
    this.createVm$();
  }

  /** Create observable of Customer ViewModels from cached customers */
  createVm$() {
    this.vms$ = this.dataService.customers$.pipe(
      map(customers => customers.map(customer => CustomerVm.create(customer)))
    );
  }

  addCustomer() {
    this.selectedVm = CustomerVm.create();
  }

  cancel() {
    this.selectedVm = null;
  }

  save(vm: CustomerVm) {
    this.selectedVm = null;
    const customer = vm.toCustomer();
    customer.id == 0 ? this.dataService.addCustomer(customer) : this.dataService.updateCustomer(customer);
  }

  selected(vm: CustomerVm) {
    this.selectedVm = vm.clone();
  }
}
