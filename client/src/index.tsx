import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {inject, observer, Provider} from 'mobx-react';
import '../semantic-themes/semantic.less'; 
import { RouteComponentProps } from 'react-router';
import { MainStore } from './stores/mainStore';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';
import { createGameStores } from './stores/createStores';
import {
    STORE_DICO,
    STORE_ROUTER,
    GameTab
} from './constants';
import {
    Menu,
    Sidebar,
    Icon,
} from 'semantic-ui-react';
import { SearchMain } from './components/Search';


const history = createBrowserHistory();
var rootStore = createGameStores(history);

export interface DicoGameProps extends RouteComponentProps<any> {
    /** MobX Stores will be injected via @inject() **/
    // [STORE_ROUTER]: RouterStore;
    // [STOURE_TODO]: TodoStore;
}

export interface DicoGameState {

}

@inject(STORE_DICO, STORE_ROUTER)
@observer
export class DicoGame extends React.Component<DicoGameProps, DicoGameState> {
    constructor(props: DicoGameProps, context: any) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        this.checkLocationChange();
    }

    componentWillReceiveProps(nextProps: DicoGameProps, nextContext: any) {
        this.checkLocationChange();
    }

    checkLocationChange() {

    }

    getStore(): MainStore {
        return this.props[STORE_DICO] as MainStore;
    }

    render() {

        const activeStyle = {
            backgroundColor: "white",
            color: "#6494bf"
        }

        return (
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "1", height: "100%", paddingLeft: "150px" }}>
                <SearchMain mainstore={this.getStore()} />
                    {/* {this.props[STORE_DICO].currentTab == GameTab.GAME &&
                        <SearchsMain />
                    } */}
                    
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Provider {...rootStore}>
        <Router history={history}>
            <Switch>
                <Route path="/" component={DicoGame} />
            </Switch>
        </Router>
    </Provider>,
     document.getElementById('root'));
