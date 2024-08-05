import { v2 as cloudinary } from 'cloudinary';
import { configEnvs } from 'src/config/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: configEnvs?.cloudinaryName,
      api_key: configEnvs?.cloudinaryKey,
      api_secret: configEnvs?.cloudinarySecretKey,
    });
  },
};
