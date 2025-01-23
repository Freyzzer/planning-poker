import { Routes } from '@angular/router';
import { FormIngresoComponent } from './components/organisms/form-ingreso/form-ingreso.component';
import { HomeTemplateComponent } from './components/templates/home-template/home-template.component';



export const routes: Routes= [
    {path: '', component: FormIngresoComponent}, // pagina principal
    {path: 'game', component: HomeTemplateComponent}, // pagina de la partida
];
