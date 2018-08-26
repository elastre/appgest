import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';

///ng2-Charts
import { ChartsModule } from 'ng2-charts';

//pipes
import { PipesModule } from '../pipes/pipes.module';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartDoughnutComponent } from '../components/graficas/chart-doughnut/chart-doughnut.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent ,   //temporal    
        ChartDoughnutComponent,
        AcountSettingsComponent, 
        ProfileComponent      
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,        
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,     
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule{}