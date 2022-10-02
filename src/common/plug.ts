import canisterConfig from '../service/canister.config';
import storage from './storage';

export async function plugLogin() {
  // @ts-ignore
  if (globalThis?.ic?.plug) {
    console.error('Please make sure the Plug extension is installed!');
    return null;
  }
  // @ts-ignore
  const connected = await globalThis.ic.plug.isConnected();
  if (!connected) {
    try {
      const whitelist = Object.values(canisterConfig).map(item => item.cid);
      // @ts-ignore
      const publicKey = await globalThis.ic.plug.requestConnect({
        whitelist,
        // host:'https://ic0.app',
        // timeout: 50000,
      });
      console.log("The connected user's public key is:", publicKey);
      // @ts-ignore
      if (connected && !globalThis.ic.plug.agent) {
        // @ts-ignore
        globalThis.ic.plug.createAgent({ whitelist });
      }
    } catch (e) {
      console.log(e);
    }
  }
  storage.set('loginType', 'plug');
}

export async function plugLogout() {
  // @ts-ignore
  await globalThis.ic.plug.disconnect();
  //Disconnect after
  storage.remove('loginType');
}
