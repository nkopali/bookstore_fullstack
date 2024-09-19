import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { User, UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DialogModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [MessageService]
})
export class HeaderComponent {
  dropdownOpen = false;
  searchTerm: string = '';
  visible: boolean = false;
  isSignUp: boolean = false;
  email: string = '';
  password: string = '';
  confPassword: string = '';
  name: string = '';
  categories: string[] | undefined;

  constructor(private booksService: BooksService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router){}

  ngOnInit(){
    this.booksService.getAllCategories().subscribe((data) => {
      this.categories = data;
    }, (error)=>{console.log("Cannot get categories ", error)})
  }

  handleSubmit() {
    console.log(this.email,this.password,this.confPassword)
    const user: User = {
      id: null,
      name: this.name,
      email: this.email,
      password: this.password
    };

    if (!this.isSignUp){
      this.userService.logIn(user).subscribe((response) => {
        console.log(response)
      },(err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: err.error.message });
      })
    } else {
      this.userService.signUp(user).subscribe((response) => {
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
      },
      (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: err.error.message });
      })
    }

  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;  // Toggle the dropdown
  }

  showDialog(isSignUp: boolean) {
    this.visible = true;
    this.isSignUp = isSignUp;
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  selectCategory(category: any) {
    this.router.navigate(['/category', category]);
    this.dropdownOpen = false;  // Close the dropdown after selection
  }

  onEnter(){
    this.router.navigate(['/search', this.searchTerm]);
  }
}
