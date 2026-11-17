/**
 * Utility untuk upload video langsung ke Cloudinary (Unsigned Upload)
 * Otomatis mengompresi video dan menghasilkan URL streaming hemat kuota.
 */
export const uploadVideoToCloudinary = async (file, onProgress) => {
  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
    localStorage.getItem('cloudinary_cloud_name') ||
    'rv0vhjkd';
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
    localStorage.getItem('cloudinary_upload_preset') ||
    'at_tajdid_unsigned';

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary belum dikonfigurasi! Harap masukkan Cloud Name dan Upload Preset terlebih dahulu di pengaturan.'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('resource_type', 'video');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          const videoUrl = data.secure_url;
          // Generate poster thumbnail otomatis dari detik pertama format .jpg
          const thumbnailUrl = videoUrl.replace(/\.[^/.]+$/, '.jpg');

          resolve({
            videoUrl,
            thumbnailUrl,
            duration: data.duration,
            bytes: data.bytes,
            format: data.format,
          });
        } catch (err) {
          reject(new Error('Gagal memproses respon dari Cloudinary.'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData.error?.message || `Upload gagal dengan kode ${xhr.status}`));
        } catch {
          reject(new Error(`Upload video gagal (${xhr.status}). Periksa nama Cloudinary Anda.`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Gagal terhubung ke Cloudinary. Periksa koneksi internet Anda.'));
    };

    xhr.send(formData);
  });
};
