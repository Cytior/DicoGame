import { STORE_ROUTER } from "../constants";
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import {Button, Form, Header, Icon, Input, Label, Loader, Menu, Segment } from "semantic-ui-react";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from "react-virtualized";
import { DicoEntry, SearchStore } from "../stores/searchStore";

const WindowScrollerDev: any = WindowScroller;

@inject(STORE_ROUTER)
@observer
export class SearchMain extends React.Component<{ mainstore: any }, any> {

    constructor(props) {
        super(props);
    }

    getSearchStore() : SearchStore {
        return this.props.mainstore.searchStore;
    }
    
    onSearchChange = (e, data) => {
        this.getSearchStore().onSearchKeywordChange(data.value);
    }

    onClickSearch =  () => {
        this.getSearchStore().searchDico();
    }

    render() {
        const searchResults = this.getSearchStore().searchResults;
        const lastKeyword = this.getSearchStore().lastKeyword;
        return (
            <div className="search-main" style={{ maxWidth: "1000px", height: "100%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "sticky", top: "0px", paddingTop: "1em", backgroundColor: "white", zIndex: 1 }}>
                    <Header as='h1' style={{ minHeight: "36px", marginBottom: "0px", color: "black" }}>
                        {"DicoGame"}
                    </Header>
                    <div style={{ marginTop: "12px", display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>
                            <Input
                                fluid
                                icon='search'
                                onChange={this.onSearchChange}
                                placeholder='Filtrer...'
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.onClickSearch()
                                    }
                                }} />
                        </div>
                        <Button basic color='pink' loading={this.getSearchStore().loading} style={{ marginLeft: "10px" }} onClick={this.onClickSearch}>Chercher</Button>
                    </div>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", marginTop: "10px", flexWrap: "wrap", minHeight: "50px" }}>
                        {/* <Loader active={this.getSearchStore().loading} inline='centered' style={{zIndex: "0"}}>Loading...</Loader> */}
                            {
                                !this.getSearchStore().loading && this.getSearchStore().dataLoaded && (
                                    <SearchResultList searchResults={searchResults} mainstore={this.props.mainstore}></SearchResultList>
                                )
                            }
                    </div>
                </div>
            
            </div>
        )
    }
}

@inject(STORE_ROUTER)
@observer
export class SearchResultItem extends React.Component<any, any> {


    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        let updateHeight = false;
        if (this.props.event !== prevProps.event) {
            updateHeight = true;
        }
        if (updateHeight && this.props.cache) {
            this.props.cache.clear(this.props.index);
            this.props.onUpdate(this.props.index);
        }
    }

    getSearchStore() : SearchStore {
        return this.props.mainstore.searchStore;
    }

    getDefinition() {
        const reptiles = ['alligator', 'snake', 'lizard'];
      
        return (
          <ol>
            {reptiles.map(reptile => (
              <li key={reptile}>{reptile}</li>
            ))}
          </ol>
        );
      }

    render() {
        const entry: DicoEntry = this.props.searchResult;

        const defRenderer = (definitions: string[]) => {
            if (!definitions) {
                return null;
            }
    
            
                return (
                    <>
                    {definitions.map(def => (
                        <li key={def}>{def}</li>
                    ))}
                    </>
                );
            
        };

        return (
            <Segment style={{ marginBottom: "15px" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.5rem", lineHeight: "100%" }}>{entry.term}</div>
                { entry.nature && <div style={{ color: "grey", fontSize: "0.8rem", lineHeight: "100%"  }}>{entry.nature}</div>}
                {defRenderer(entry.definitions)}
            </Segment>
        );
    }

}


@inject(STORE_ROUTER)
@observer
export class SearchResultList extends React.Component<{ mainstore: any, searchResults: any, scrollTop?: any, isScrolling?: any, onChildScroll?: any, windowData?: any, height?: any }, any> {

    cache: CellMeasurerCache;
    list: any;//ReactVirtualisedList

    constructor(props) {
        super(props);

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 75
        })
    }

    render() {
        const searchResults = this.props.searchResults;

        const rowRenderer = ({ index, parent, isScrolling, key, style }) => {
            return (
                <CellMeasurer
                    key={key}
                    cache={this.cache}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                >
                    <div style={style}>
                        <SearchResultItem mainstore={this.props.mainstore} index={index} cache={this.cache} searchResult={searchResults[index]} onUpdate={(indexRow: number) => {
                            if (this.list) {
                                this.list.recomputeRowHeights(indexRow);
                            }
                        }} />
                    </div>
                </CellMeasurer>
            );
        };

        return (
            <WindowScrollerDev>
                {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                rowCount={searchResults.length}
                                ref={ref => this.list = ref}
                                autoHeight
                                height={height}
                                width={width}
                                scrollTop={scrollTop}
                                rowHeight={this.cache.rowHeight}
                                deferredMeasurementCache={this.cache}
                                rowRenderer={rowRenderer}
                                overscanRowCount={10}
                            >
                            </List>
                        )}
                    </AutoSizer>
                )}
            </WindowScrollerDev>
        );
    }

}