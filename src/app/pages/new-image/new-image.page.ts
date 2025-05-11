import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { PickimagesService } from 'src/app/core/services/pickimages.service';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { image } from 'src/app/models/file';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.page.html',
  styleUrls: ['./new-image.page.scss'],
  standalone: false
})
export class NewImagePage implements OnInit {

  imageForm: FormGroup;
  imagePreview: string | null = null;
  imageFile: File | null = null;
  fullImage:any;

  constructor(
    private fb: FormBuilder,
    private pickImage: PickimagesService,
    private supabase: SupabaseService,
    private storage: FirebaseService,
    private router: Router
  ) {
    this.imageForm = this.fb.group({
      description: ['', Validators.required],
      image: ['', Validators.required] 
    });
  }

  ngOnInit(): void {}

  async onFileSelected() {
    const result = await this.pickImage.pickFiles();

    if (result) {
      this.imagePreview = result.base64Src;

      this.imageForm.patchValue({
        image: result.base64
      });

      this.fullImage = result;

    }
  }

  async onSubmit() {
    if (this.imageForm.valid) {
      const formData = new FormData();
      formData.append('description', this.imageForm.get('description')!.value);
      
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

        const file: image ={
          description: this.imageForm.get('description')!.value,
          date: Date.now(),
          url: ""
        };

        this.storage.addImage(file, this.fullImage).then(() => {
          console.log('Imagen subida a Firebase');
          this.router.navigate(['/home']);
        }

        

        ).catch((error) => {
          console.error('Error al subir la imagen a Firebase:', error);
        });
        

      console.log('Form enviado', this.imageForm.value);
    }
  }
}
