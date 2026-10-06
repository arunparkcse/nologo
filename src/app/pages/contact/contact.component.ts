import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PAGES, SITE } from '../../data/content';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  page = PAGES.contact;
  site = SITE;

  formData = {
    name: '',
    email: '',
    service: '',
    message: ''
  };

  submitted = false;

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.submitted = true;
    }
  }
}
