import { SearchStore } from './searchStore';
import { action, observable } from 'mobx';
import { GameTab } from '../constants';

export class MainStore {

    
    @observable public currentTab: GameTab = GameTab.GAME;
    
    public searchStore: SearchStore = new SearchStore();

    constructor() {
        if (this.currentTab == GameTab.HISTORY) {
           // this.historyStore.loadHistory();
        }
        if (this.currentTab == GameTab.PLAYERS) {
           // this.playersStore.loadPlayers();
        }
    }

    //MAIN STORE
    @action
    changeTab(tab: GameTab) {
        this.currentTab = tab;
        if (this.currentTab == GameTab.GAME) {
            
        }
        if (this.currentTab == GameTab.HISTORY) {
            // this.historyStore.loadHistory();
         }
         if (this.currentTab == GameTab.PLAYERS) {
            // this.playersStore.loadPlayers();
         }
    }
}

export default MainStore;