import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.page.html',
  styleUrls: ['./new-image.page.scss'],
  standalone: false
})
export class NewImagePage implements OnInit {

  imageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.imageForm = this.fb.group({
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }
  imageFile: File | null = null;
  fileAttachment: File | null = null;
  imagePreview: string | null = null;

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileAttachment = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }
  onSubmit() {
    if (this.imageForm.valid) {
      const formData = new FormData();
      formData.append('description', this.imageForm.get('description')!.value);
      formData.append('image', this.imageFile!);
    }
  }



}
