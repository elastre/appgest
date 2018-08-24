import {RouterModule,Routes} from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AcountSettingsComponent } from "./acount-settings/acount-settings.component";
import { LoginGuardGuard } from "../services/service.index";

const PAGESROUTES: Routes = [
    {   path:'', 
        component:PagesComponent,
        canActivate: [LoginGuardGuard],
        children:[
            {path:'dashboard', component:DashboardComponent,data:{titulo:"Dashboard"}},
            {path:'progress', component:ProgressComponent,data:{titulo:"Barras de Progreso"}},
            {path:'graficas1', component:Graficas1Component,data:{titulo:"Gráficas"}},
            {path:'account-settings', component:AcountSettingsComponent,data:{titulo:"Configuración"}},
            {path:'', redirectTo:'/dashboard',pathMatch:'full'}
        ]
    }  
]
export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);