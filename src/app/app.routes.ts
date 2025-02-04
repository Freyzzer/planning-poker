import { Routes } from '@angular/router';
import { FormCreateGameComponent } from './shared/components/organisms/form-create-game/form-create-game.component';
import { HomeTemplateComponent } from './features/home-template/home-template.component';



export const routes: Routes= [
    {path: '', component: FormCreateGameComponent}, // pagina principal
    {path: 'game/:id', component: HomeTemplateComponent}, // pagina de la partida
];
