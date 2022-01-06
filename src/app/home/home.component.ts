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

  /*
  This function gets called when the page initializes. It currently calls the getAllCustomers() function which sends the GET request to the backend service
  to provide it with the list of cusotmers. The list of customers is then set as the source for the Angular Material table (in MatTableDataSource).
  */
  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(
      (data) => {
        this.customersData = data;
        this.customersSource.data = data;
      }
    );
  }

  //After the view is created this function is called. Its current role is to initialize the paginator.
  ngAfterViewInit() {
    this.customersSource.paginator = this.paginator;
  }

  /*
  Since the amount of data was not large, frontend filteration/search was used. This function is responsible to filter
  the data received from the backend every time the search button is clicked.
  */
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
