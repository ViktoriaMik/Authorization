import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogModule} from "primeng/dialog";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./components/navigation.module').then(m => m.NavigationModule)
    },
    {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./components/navigation.module').then(m => m.NavigationModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}), DialogModule,],
    declarations: [],
    exports: [RouterModule,]
})
export class AppRoutingModule {
}

