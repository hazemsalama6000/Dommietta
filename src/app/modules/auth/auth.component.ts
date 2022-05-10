import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '../i18n';

@Component({
  selector: '<body[root]>',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  Currentlang:'عربى'|'English';
  CurrentLangImage:string;

  constructor(private TranslationService:TranslationService) {}

  changeLang(lang:'ar'|'en'){
	 this.Currentlang = lang=='ar'?'عربى':'English';
	 this.CurrentLangImage = lang=='ar'?'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg':'https://cdn-icons-png.flaticon.com/512/197/197374.png';
	 this.TranslationService.setLanguage(lang);
	}

  ngOnInit(): void {
    document.body.classList.add('bg-white');
	let lang:string = this.TranslationService.getSelectedLanguage();
	this.Currentlang= lang =='ar' ?'عربى':'English';
	this.CurrentLangImage = lang =='ar'?'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg':'https://cdn-icons-png.flaticon.com/512/197/197374.png';
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
}
