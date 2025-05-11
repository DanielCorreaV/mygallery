import { Injectable } from '@angular/core';
import { supabase } from '../supabase.config';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  async uploadBase64Image(base64Data: string, date: number): Promise<string | null> {
    const contentType = 'image/png'; 
    const fileName = `image-${date}.png`; 

    // Converti a Blob
    const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const blob = new Blob([new Uint8Array(byteArrays)], { type: contentType });

    // Sube a Supabase
    const { data, error } = await supabase.storage
      .from('images') 
      .upload(`images/${fileName}`, blob, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }

    // Obtener URL pública
    const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(data.path);
    return publicUrl.publicUrl;
  }
}
