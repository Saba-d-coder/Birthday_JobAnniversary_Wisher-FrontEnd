import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestEmployeesComponent } from './test-module/test-employees/test-employees.component';
import { TestLoginComponent } from './test-module/test-login/test-login.component';
import { TestWelcomeComponent } from './test-module/test-welcome/test-welcome.component';
const routes: Routes = [
  { path: '', component: TestWelcomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: TestLoginComponent },
  { path: 'employees', component: TestEmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
