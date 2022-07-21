import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { components } from 'src/app/_metronic/kt';
import { ComplainListComponent } from './components/complain-list/complain-list.component';
import { CustomerUpdateManageComponent } from './components/customer-update-manage/customer-update-manage.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';

const routes: Routes = [
    { path: 'readinglist', component: ReadingListComponent },
    { path: 'complainlist', component: ComplainListComponent },
	{path:'cutomerupdatemanage' , component:CustomerUpdateManageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule { }
