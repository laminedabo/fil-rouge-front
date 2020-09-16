import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls(){
    return this.loginForm.controls;
  }

  message: string;

  seConnecter(){
    // console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.formControls.username.value,this.formControls.password.value).subscribe(
      data => {
        console.log('token: '+data.token)
      },
      error => {
        if (error.status === 401) {
          this.message = 'Username ou Password incorrect.'
        }
        console.log('message: '+error.error.message+' code: '+error.error.code)
        return
      }
    );
  }
}
