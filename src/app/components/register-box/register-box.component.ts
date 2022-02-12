import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/AppState.model';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-box',
  templateUrl: './register-box.component.html',
  styleUrls: ['./register-box.component.css'],
})
export class RegisterBoxComponent implements OnInit {
  cities$?: Observable<string[]>;

  form!: FormGroup;
  jwtErrorMessage: string = '';

  constructor(
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private cartsService: CartsService,
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idNum: this.fb.control(null, [
        Validators.required,
        Validators.min(100000000),
        Validators.max(999999999),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      confirmPassword: this.fb.control(null, [Validators.required]),
      city: this.fb.control(null, [Validators.required]),
      street: this.fb.control(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      firstName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: this.fb.control(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });

    this.cities$ = this.store.select<string[]>((state) => state.cities);
  }

  disable(): boolean {
    const needToDisable: boolean =
      this.form.get('idNum')!.invalid ||
      this.form.get('email')!.invalid ||
      this.form.get('password')!.invalid ||
      this.form.get('confirmPassword')!.invalid ||
      this.form.get('password')!.value !==
        this.form.get('confirmPassword')!.value;
    return needToDisable;
  }

  async onSubmit() {
    try {
      await this.usersService.setJwtCookieByRegister(this.form.value);

      await this.usersService.fetchUserDetails();

      await this.cartsService.fetchCartDetails();

      await this.categoriesService.fetchCategories();

      this.router.navigate(['/home']);
    } catch (error: any) {
      if (error.status === 400) {
        this.jwtErrorMessage = error.error;
        setTimeout(() => {
          this.jwtErrorMessage = '';
        }, 3000);
      } else {
        this.router.navigate(['/error']);
      }
    }
  }
}
