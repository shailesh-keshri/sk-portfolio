import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private http = inject(HttpClient);

  status: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  hasDomainError = false;

  formData = {
    name: '',
    email: '',
    subject: '',
    purpose: '',
    message: ''
  };

  validateEmailDomain() {
    const email = this.formData.email ? this.formData.email.toLowerCase().trim() : '';
    if (!email) {
      this.hasDomainError = false;
      return;
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
      this.hasDomainError = false;
      return;
    }

    const localPart = parts[0];
    const domain = parts[1];

    const blacklistedDomains = [
      'test.com', 'example.com', 'example.org', 'example.net', 'invalid.com',
      'mailinator.com', 'yopmail.com', 'tempmail.com', '10minutemail.com',
      'temp-mail.org', 'dummy.com', 'fake.com', 'asdf.com', 'trashmail.com'
    ];

    const blacklistedLocalParts = ['test', 'dummy', 'fake', 'asdf', 'admin', 'user'];

    if (
      blacklistedDomains.includes(domain) ||
      blacklistedLocalParts.includes(localPart) ||
      domain.startsWith('test') ||
      domain.startsWith('dummy') ||
      domain.startsWith('fake')
    ) {
      this.hasDomainError = true;
    } else {
      this.hasDomainError = false;
    }
  }

  onSubmit(form: NgForm) {
    this.validateEmailDomain();
    if (form.invalid || this.hasDomainError) return;

    // Double-check email format and message minimum length programmatically
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.formData.email) || this.hasDomainError) {
      this.status = 'error';
      setTimeout(() => this.status = 'idle', 5000);
      return;
    }

    if (!this.formData.message || this.formData.message.trim().length < 50) {
      this.status = 'error';
      setTimeout(() => this.status = 'idle', 5000);
      return;
    }

    this.status = 'submitting';

    // EmailJS REST API endpoint
    const endpoint = 'https://api.emailjs.com/api/v1.0/email/send';

    // Use environment variables for EmailJS credentials and decode them
    const payload = {
      service_id: atob(environment.emailjs.serviceId),
      template_id: atob(environment.emailjs.templateId),
      user_id: atob(environment.emailjs.publicKey),
      template_params: {
        from_name: this.formData.name,
        reply_to: this.formData.email,
        subject: this.formData.subject,
        purpose: this.formData.purpose,
        message: this.formData.message
      }
    };

    this.http.post(endpoint, payload, { responseType: 'text' }).subscribe({
      next: () => {
        this.status = 'success';
        form.resetForm();
        this.hasDomainError = false;
        setTimeout(() => this.status = 'idle', 5000);
      },
      error: (err) => {
        console.error('Form submission error', err);
        this.status = 'error';
        setTimeout(() => this.status = 'idle', 5000);
      }
    });
  }
}
