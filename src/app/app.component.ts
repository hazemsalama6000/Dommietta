import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import { locale as arLang } from './modules/i18n/vocabs/ar';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	
  direction:string;

  constructor(private translationService: TranslationService) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
	  arLang
    );
  
}

setDirection()
{
	this.translationService.myObservable.subscribe(
		(data)=>{
			this.direction=data;
			document.dir = this.direction;
		}
	);
}


  ngOnInit(){
	this.setDirection();
	this.direction=this.translationService.getHtmlDirection();
            }


}
