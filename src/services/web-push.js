import { firebaseMessaging } from '@/lib/firebase';
import { WebPush } from '@/lib/WebPush';
import { messaging as messagingConfig } from '~~/config/firebase';

export default new WebPush({
  firebaseMessaging,
  ...messagingConfig,
});
