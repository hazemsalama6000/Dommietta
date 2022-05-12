import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginData } from '../../models/ILoginData.interface';
import { ICompanyConfigResponse } from '../../models/ICompanyConfigResponse.interface';
import { ILoginResponseInterface } from '../../models/ILoginResponse.interface';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	 TOKENIN_LOCALSTORAGE="token";

	// KeenThemes mock, change it to:
	defaultAuth: any = {
		email: 'admin@demo.com',
		password: 'demo',
	};

	loginForm: FormGroup;
	hasError: boolean;
	returnUrl: string;
	isLoading$: Observable<boolean>;

	// private fields
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.isLoading$ = this.authService.isLoading$;
		// redirect to home if already logged in
		// TODO check token existance
           localStorage.removeItem(this.TOKENIN_LOCALSTORAGE);
		if (localStorage.getItem(this.TOKENIN_LOCALSTORAGE)) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit(): void {
		this.initForm();
		// get return url from route parameters or default to '/'
		this.returnUrl =
			this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.loginForm.controls;
	}

	initForm() {
		this.loginForm = this.fb.group({

			companyCode: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20)
				])
			],
			userName: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20)
				])
			],
			password: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(20)
				])
			]

		});
	}



	submit(LoginData: ILoginData) {

		this.hasError = false;
		            
		//check Company Validation 
		const loginSubscr = this.authService
			.CheckCompanyExistance(LoginData)
			.pipe(first())
			.subscribe((CompanyConfigResponse: ICompanyConfigResponse) => {
            
				//Inner Request To check User Validation
				this.authService.
					Login(LoginData, CompanyConfigResponse.companyLink)
					.subscribe((LoginResponse: ILoginResponseInterface) => {
						console.log(LoginResponse);
						localStorage.setItem(this.TOKENIN_LOCALSTORAGE,LoginResponse.token);
						this.router.navigate(['']);
					});

				/*	if (user) {
						this.router.navigate([this.returnUrl]);
					} else {
						this.hasError = true;
					}*/
			});
		this.unsubscribe.push(loginSubscr);
	}


	ngOnDestroy() {
		this.unsubscribe.forEach((sb) => sb.unsubscribe());
	}
}
