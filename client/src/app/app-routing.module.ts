import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DialogModule} from "primeng/dialog";

const routes: Routes = [
    {path: '', loadChildren: () => import('./components/navigation.module').then(m => m.NavigationModule)},

];

@NgModule({
    imports: [RouterModule.forRoot(routes), DialogModule, ],
    declarations: [],
    exports: [RouterModule,]
})
export class AppRoutingModule {
}

