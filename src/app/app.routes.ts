import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {path:"",component:LandingComponent},
    {path:"dash",component:DashboardComponent},
    {path:"add",component:AddComponent},
    {path:"edit/:id",component:EditComponent}
];
