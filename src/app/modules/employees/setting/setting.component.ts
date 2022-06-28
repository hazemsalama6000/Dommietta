import { Component,HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',

})
export class SettingComponent implements OnInit {
  @HostBinding('class') class =
  'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
@HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor() { }

  ngOnInit(): void {
  }

}
