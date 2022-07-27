import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupIdNameComponent } from 'src/app/shared-module/Components/lookupId_name/lookupId_name.component';
import { ComplainListComponent } from './components/complain-list/complain-list.component';
import { CustomerUpdateManageComponent } from './components/customer-update-manage/customer-update-manage.component';
import { IssueComponent } from './components/issue/issue.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';

const routes: Routes = [
	{path:'cutomerupdatemanage' , component:CustomerUpdateManageComponent},
    { path: 'readinglist', component: ReadingListComponent },
    { path: 'complainlist', component: ComplainListComponent },
    { path: 'compainType', component: LookupIdNameComponent, data: { page: 'compainType' } },
    {path:'issue',component:IssueComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule { }
