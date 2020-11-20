import { History } from 'history';
import { MainStore } from './mainStore';
import { RouterStore } from './routerStore';
import { STORE_DICO, STORE_ROUTER } from '../constants';

export function createGameStores(history: History) {
  const mainStore = new MainStore();
  const routerStore = new RouterStore(history);
  return {
      [STORE_DICO]: mainStore,
      [STORE_ROUTER]: routerStore
  };
}
