import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplainListComponent } from './components/complain-list/complain-list.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';

const routes: Routes = [
    { path: 'readinglist', component: ReadingListComponent },
    { path: 'complainlist', component: ComplainListComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule { }
