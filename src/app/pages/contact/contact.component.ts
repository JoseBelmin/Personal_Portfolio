import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { NgForm } from '@angular/forms'; // Import NgForm for type checking

@Component({
  selector: 'app-contact',
  standalone: false, // Keep as per your existing setup
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Define the structure for your form data
  formData = {
    full_name: '',
    email: '',
    subject: '',
    message: ''
  };

  isLoading: boolean = false; // To show loading state on button
  submitStatus: 'none' | 'success' | 'error' = 'none'; // To show submission feedback

  // Inject HttpClient into the component's constructor
  constructor(private http: HttpClient) { }

  /**
   * Handles the form submission.
   * Sends the form data to the Django backend API.
   * @param form The NgForm instance, providing access to form validity.
   */
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      // If form is invalid, mark all fields as touched to show validation errors
      form.control.markAllAsTouched();
      console.warn('Form is invalid. Please fill in all required fields correctly.');
      this.submitStatus = 'error'; // Indicate error due to invalid form
      return;
    }

    this.isLoading = true; // Set loading state to true
    this.submitStatus = 'none'; // Reset status

    // Define your Django backend API URL for contact submissions
    // IMPORTANT: Replace with your actual Django API URL (e.g., http://127.0.0.1:8000/api/contact-submissions/)
    const apiUrl = 'http://127.0.0.1:8000/api/contact-submissions/'; 

    this.http.post(apiUrl, this.formData).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
        this.submitStatus = 'success'; // Set success status
        form.resetForm(); // Reset the form fields after successful submission
        this.isLoading = false; // Reset loading state
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.submitStatus = 'error'; // Set error status
        this.isLoading = false; // Reset loading state
        // You might want to provide more specific error messages to the user here
      }
    });
  }
}
