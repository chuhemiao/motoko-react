import { Actor, HttpAgent } from '@dfinity/agent';
import storage from '../common/storage';
import canisterConfig from './canister.config';

// unify agent
export const $agent: HttpAgent = new HttpAgent();

// cache Actor instance
const $actorMap = new Map();

/**
 * createActor
 *  Plug needs to use window.ic.plug.createActor
 */
export function getActor(props: getActorProps) {
  // string
  if (typeof props === 'string') {
    props = canisterConfig[props];
  }
  const cid = props.cid;
  const { idl } = props;
  let actor = null;
  if (!$actorMap.has(cid)) {
    if (storage.get('loginType') === 'plug') {
      //  plugLogin();
      // @ts-ignore
      actor = globalThis?.ic?.plug.createActor({
        canisterId: cid,
        interfaceFactory: idl,
      });
    } else {
      // @ts-ignore
      actor = Actor.createActor(idl, { agent: $agent, canisterId: cid });
    }
    $actorMap.set(cid, actor);
  }
  return $actorMap.get(cid);
}

// Type
type getActorProps = typeof canisterConfig.ndp | keyof typeof canisterConfig;
