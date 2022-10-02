import { StoicIdentity } from 'ic-stoic-identity';
import { $agent } from '../service';
import storage from './storage';

export async function stoicLogin() {
  return StoicIdentity.load().then(async (identity: any) => {
    if (identity !== false) {
      //ID is a already connected wallet!
      // return identity.getPrincipal().toText();
      // return (await $agent.getPrincipal()).toText();
    } else {
      //No existing connection, lets make one!
      identity = await StoicIdentity.connect();
      // return identity.getPrincipal().toText();
    }
    $agent.replaceIdentity(identity);
    storage.set('loginType', 'stoic');
    identity
      .accounts()
      .then((res: string) => {
        console.log('stoic address', JSON.parse(res));
      })
      .catch((err: any) => {
        console.error('stoic accounts', err);
      });
  });
}

export function stoicLogout() {
  storage.remove('loginType');
  //Disconnect after
  StoicIdentity.disconnect();
}
