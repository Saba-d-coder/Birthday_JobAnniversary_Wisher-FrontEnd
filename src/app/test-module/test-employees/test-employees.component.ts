import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-test-employees',
  templateUrl: './test-employees.component.html',
  styleUrls: ['./test-employees.component.css'],
})
export class TestEmployeesComponent implements OnInit {
  public receivedFlag: boolean = false;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.receivedFlag = false;
  }

  getEmployees(): void {
    this.empService.getEmployees().subscribe(() => (this.receivedFlag = true));
  }
}
