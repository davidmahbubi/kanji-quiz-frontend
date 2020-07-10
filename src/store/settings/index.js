import { SAVE_PROFILE_SETTINGS, SAVE_PROFILE_PICTURE, SAVE_PROFILE_PASSWORD } from '@/store/actions.type';
import { setAuth, settings } from '@/commons/api.service';

const actions = {
    [SAVE_PROFILE_SETTINGS](ctx, profileData) {
        return new Promise((resolve, reject) => {
            setAuth();
            settings.patch(profileData.field, {
                [profileData.field]: profileData.value,
            })
              .then((result) => {
                  resolve(result);
              })
              .catch((error) => {
                  reject(error);
              })
        });
    },
    [SAVE_PROFILE_PASSWORD](ctx, passwords) {
        return new Promise((resolve, reject) => {
            setAuth();
            settings.patch('password', passwords)
              .then((result) => {
                  resolve(result);
              })
              .catch((error) => {
                  reject(error);
              });
        })
    },
    [SAVE_PROFILE_PICTURE](ctx, picture) {
        return new Promise((resolve, reject) => {
            setAuth();
            settings.postMedia('picture', picture)
              .then((result) => {
                  resolve(result);
              })
              .catch((error) => {
                  reject(error);
              });
        })
    }
}

export default {
    namespaced: true,
    actions,
}
