import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://urkehmbemiciizziynjl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload an image to Supabase Storage
 * @param bucketName Name of the Supabase storage bucket (e.g. 'images' or 'property-care')
 * @param filePath Destination path in bucket (e.g. 'services/house-cleaning.jpg')
 * @param file File, Blob, or Buffer
 */
export async function uploadImage(bucketName: string, filePath: string, file: File | Blob) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Error uploading to Supabase Storage:', error);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return {
    ...data,
    publicUrl: publicUrlData.publicUrl,
  };
}

/**
 * Get public URL of an image stored in Supabase Storage
 */
export function getStorageImageUrl(bucketName: string, filePath: string): string {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * List files in a bucket folder
 */
export async function listBucketImages(bucketName: string, folder: string = '') {
  const { data, error } = await supabase.storage.from(bucketName).list(folder, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error('Error listing Supabase bucket images:', error);
    throw error;
  }

  return data;
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteStorageImage(bucketName: string, filePaths: string[]) {
  const { data, error } = await supabase.storage.from(bucketName).remove(filePaths);

  if (error) {
    console.error('Error deleting image from Supabase Storage:', error);
    throw error;
  }

  return data;
}
