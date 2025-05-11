import { Injectable } from '@angular/core';
import { FilePicker, PickFilesResult } from '@capawesome/capacitor-file-picker';

@Injectable({
  providedIn: 'root'
})
export class PickimagesService {

  constructor() { }

  async requestPermissions() {
  const result = await FilePicker.requestPermissions();
  if (result) {
    console.log('Permissions granted:');
  }
  };

  async pickFiles(): Promise<{ base64Src: string, base64: string, path?: string } | null> {
  try {
    const result = await FilePicker.pickFiles({
      types: ['image/*'],
      limit: 1,
      readData: true
    });

    if (result.files.length === 0) {
      console.log('No files selected');
      return null;
    }

    const file = result.files[0];
    const mimeType = file.mimeType || 'image/*'; 
    console.log('Selected file:', file.data);

    return {
      base64Src: `data:${mimeType};base64,` + file.data,
      base64: file.data!,
      path: file.path
    };
  } catch (error: any) {
    if (error?.message === 'pickFiles canceled.') {
      console.log('Selección cancelada por el usuario.');
    } else {
      console.error('Error al seleccionar archivo:', error);
    }
    return null;
  }
}



}

