import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../_models/customer.model';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  
  displayedColumns: string[] = ['country', 'state', 'country-code', 'phone'];
  
  customersSource = new MatTableDataSource<Customer>();

  customersData: Customer[] = [];
  selectedCountry: string = "";
  validity: string = "";


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.customersData = data;
        this.customersSource.data = data;
      }
    );
  }

  ngAfterViewInit() {
    this.customersSource.paginator = this.paginator;
  }

  filterData() {
    var data = this.customersData.filter(customer => {
      if(this.selectedCountry != "" && this.selectedCountry != customer.country.toLowerCase())
        return false;

      if(this.validity != "" && this.validity != customer.state.toString())
        return false;

      return true;
    });

    this.customersSource.data = data;
  }
}
