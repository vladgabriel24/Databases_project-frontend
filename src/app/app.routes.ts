import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewMenuComponent} from './dashboard/menus/view-menu/view-menu.component';
import {EditMenuComponent} from './dashboard/menus/edit-menu/edit-menu.component';


export const routes: Routes = [

    { path: 'view-menu', component: ViewMenuComponent },
    { path: 'edit-menu', component: EditMenuComponent },
    { path: '', redirectTo: '/view-menu', pathMatch: 'full' }, // Default route
];
