import React, { Component } from 'react';
import CadrDeckImage from './images/deck.png';
import CadrCover from './images/cover.png';


class Sandbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CardsDeck: new Array(52), //Cards in deck
            
            
        };
        this.TableCanvas = React.createRef()
        this.num_to_rank = {0: "2", 1: "3", 2: "4", 3: "5", 4: "6", 5: "7", 6: "8", 7: "9", 8: "10", 9: "J", 10: "Q", 11: "K", 12: "A"}
        this.rank_to_num = {"2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "10": 8, "J": 9, "Q": 10, "K": 11, "A": 12}
        this.num_to_suit = {0: "H", 1: "D", 2: "S", 3: "C"}
        this.suit_to_num = {"H": 0, "D": 1, "S": 2, "C": 3}
        this.cardToImage = {}
        let i;
        for (i=0; i<52; i++) {
            let cardName = this.num_to_rank[Math.floor(i/13)]+this.num_to_suit[i % 13]
            this.cardToImage[cardName] = cardName 
        }
        // binding for set this
        // this.StartNewGame.bind(this);
        // this.DoOneMove.bind(this);
        // this.EndMove.bind(this);
        // this.GetOneCardFromDeck.bind(this);
        // this.componentDidUpdate.bind(this);
        // this.render.bind(this);
        // this.draw_card.bind(this);
      
    }

    render() {
        return (
            <div>HI</div>
        )
    }
}

export default Sandbox;
