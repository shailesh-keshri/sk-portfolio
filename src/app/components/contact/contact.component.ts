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

  formData = {
    name: '',
    email: '',
    subject: '',
    purpose: '',
    message: ''
  };

  onSubmit(form: NgForm) {
    if (form.invalid) return;

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
