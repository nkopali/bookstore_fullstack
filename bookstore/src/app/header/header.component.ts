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
import { AuthServiceService } from '../auth-service.service';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DialogModule, ButtonModule, InputTextModule, ToastModule,
            AvatarModule, BadgeModule, MenuModule],
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
  isLoggedIn: boolean = false;
  dropdownItems: MenuItem[] | undefined;
  cart_items: string|number = 0;

  constructor(private booksService: BooksService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router,
              private authService: AuthServiceService){}

  ngOnInit(){
    this.booksService.getAllCategories().subscribe((data) => {
      this.categories = data;
    }, (error)=>{console.log("Cannot get categories ", error)})

    this.isLoggedIn = this.authService.isLoggedIn();

    this.dropdownItems = [
      {
          label: 'Account',
          items: [
              {
                  label: 'Logout',
                  icon: 'pi pi-sign-out',
                  command: () => {
                    this.logOut();
                }
              }
          ]
      }
  ];
  }

  handleSubmit() {
    if (!this.isSignUp){
      this.authService.login(this.email, this.password).subscribe((response) =>{
        if (this.authService.isLoggedIn()){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response });
          this.isLoggedIn = true;
          this.showDialog(false)
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: response });
        }
      })
    } else {
      const user: User = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      if (this.password === this.confPassword) {
        this.authService.signUp(user).subscribe((response) => {
          if (this.authService.isLoggedIn()){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response });
            this.isLoggedIn = true;
            this.showDialog(false)
          } else {
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: response });
          }
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: "Password don't match" });
      }
    }

  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;  // Toggle the dropdown
  }

  showDialog(visible: boolean) {
    this.visible = visible;
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  logOut(){
    this.authService.logout();
    this.isLoggedIn = false;
  }

  selectCategory(category: any) {
    this.router.navigate(['/category', category]);
    this.dropdownOpen = false;  // Close the dropdown after selection
  }

  onEnter(){
    this.router.navigate(['/search', this.searchTerm]);
  }
}
