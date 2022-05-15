import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  TOKENIN_LOCALSTORAGE="token";


  constructor(private layout: LayoutService,private router:Router) {}

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }

  logout(){
	  localStorage.removeItem(this.TOKENIN_LOCALSTORAGE);
	  this.router.navigate(['/auth']);
          }

}
