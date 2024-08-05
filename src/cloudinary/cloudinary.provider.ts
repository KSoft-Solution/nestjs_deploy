import { v2 } from 'cloudinary';
import { configEnvs } from 'src/config/config';
import { CLOUDINARY } from './constants';


export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: configEnvs?.cloudinaryKey,
      api_key: configEnvs?.cloudinaryKey,
      api_secret: configEnvs?.cloudinarySecretKey,
    });
  },
};
