import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  password: string;
  confirmPassword: string;
  email: string;
  pseudo: string;
  errorPassword: boolean;
  errorConfirmPassword: boolean;

  constructor(private userService: UserService) {
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.pseudo = '';
    this.errorPassword = false;
    this.errorConfirmPassword = false;
  }

  ngOnInit(): void {
  }

  enterPassword() {
    if(this.password.trim() !== '' && !this.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
        this.errorPassword = true;
        this.errorConfirmPassword = false;
    }else{
      this.errorPassword = false;
      if(this.password.trim() !== '' &&
        this.confirmPassword !== '' &&
        this.confirmPassword !== this.password){
        this.errorConfirmPassword = true;
      }
    }
  }

  enterConfirmPassword() {
    if(this.password.trim() !== ''  &&
      this.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) &&
      this.confirmPassword !== '' &&
      this.confirmPassword !== this.password
    ){
      this.errorConfirmPassword = true;
    }else{
      this.errorConfirmPassword = false;
    }
  }

  register(){
    this.userService.register(this.email, this.pseudo, this.password).subscribe({
      next() {
        window.location.href = '/login';
      },
      error(err) {
        alert(err);
      }
    });
  }

}
