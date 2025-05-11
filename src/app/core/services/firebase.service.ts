import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { image } from 'src/app/models/file';
import { SupabaseService } from './supabase.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore, private supabase: SupabaseService) { }

  
  async addImage(image: image, fullImage:any): Promise<void> {

    const url = await this.supabase.uploadBase64Image(fullImage.base64, image.date);
    if (!url) {
      console.error('Error uploading image to Supabase');
      return;
    }
    const imagesref = doc(this.firestore, `images/IMG-${image.date}`);
    return setDoc(imagesref, {
      description: image.description,
      date: image.date,
      url: url,
    }).then(() => {
      console.log('Document written with ID: ', imagesref.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }
getImages(): Observable<image[]> {
    const ImagesRef = collection(this.firestore, `images`);
    return collectionData(ImagesRef, { idField: 'id' }) as Observable<image[]>;
  }

  getImage(id: string): Promise<image> {
    const imageRef = doc(this.firestore, `images/${id}`);
    return getDoc(imageRef).then((doc) => {
      if (doc.exists()) {
        return { ...doc.data() } as image;
      } else {
        throw new Error('No such document!');
      }
    });
  }


  
}
