import React, { Component } from 'react';
import CardDeckImage from '../modules/images/deck.png';
import Cover from '../modules/images/cover.png';
import CardCover from '../modules/images/cardcover.png';
import './Sandbox.css';
import Draggable from 'react-draggable';
import Card from '../modules/Card.js'

const num_to_rank = {0: "2", 1: "3", 2: "4", 3: "5", 4: "6", 5: "7", 6: "8", 7: "9", 8: "T", 9: "J", 10: "Q", 11: "K", 12: "A"}
const rank_to_num = {"2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "T": 8, "J": 9, "Q": 10, "K": 11, "A": 12}
const num_to_suit = {0: "C", 1: "D", 2: "H", 3: "S"}
const suit_to_num = {"C": 0, "D": 1, "H": 2, "S": 3}


function makeDeck(numDecks) {
    let deck = new Array(numDecks*52)
    let i
    for (i=0; i<deck.length; i++) {
        deck[i] = i
    }
    return deck
}

function numToCard(cardNumber) {
    return num_to_rank[cardNumber%13]+num_to_suit[Math.floor(cardNumber/13)%4]
}


class Sandbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: makeDeck(1),
            player: 0,
            numDecks: 1, //Number of decks being used to play
            deck: makeDeck(1), //Cards in deck
            numDeal: 0,
            numPlayers: 8,  //Number of players at the table
            playerHands: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []},  //Hands of Players at the Table

        };

        this.TableCanvas = React.createRef()

        // binding for set this
        // this.StartNewGame.bind(this);
        // this.DoOneMove.bind(this);
        // this.EndMove.bind(this);
        // this.GetOneCardFromDeck.bind(this);
        // this.componentDidUpdate.bind(this);
        // this.render.bind(this);
        // this.draw_card.bind(this);
      
    }


    //Shuffles this.state.deck
    Shuffle = () => {
        let newDeck = this.state.deck.slice()

        newDeck.sort(() => Math.random() - 0.5);

        this.setState({
            deck: newDeck
        })
    }

    //Draws card from deck to passed player
    Draw = (player) => {
        let newDeck = this.state.deck.slice()
        let draw = newDeck.pop()
        let newPlayerHands = this.state.playerHands
        newPlayerHands[player].push(draw)
        this.setState({
            playerHands: newPlayerHands,
            deck: newDeck
        })
    }

    //Deals by drawing in a forloop
    Deal = (numCards) => {
        if (numCards*this.state.numPlayers>this.state.deck.length) {
            alert("Not enough cards in deck to deal!")
        } else {
            let newDeck = this.state.deck.slice()
            let newPlayerHands = this.state.playerHands
            let i, j
            for (i=0; i<numCards; i++) {
                for (j=0; j<this.state.numPlayers; j++) {
                    newPlayerHands[j].push(newDeck.pop())
                }
            }
            this.setState({
                deck: newDeck,
                playerHands: newPlayerHands
            })
        }
    }

    handleDealChange = (event) => {
        let newNumDeal = parseInt(event.target.value)
        if (newNumDeal > 0) {
            this.setState({numDeal: newNumDeal});
        } else {
            this.setState({numDeal: 0});
        }
        event.preventDefault()
    }

    handleDeal = (event) => {
        this.Deal(this.state.numDeal)
        event.preventDefault()
    }

    handlePlayerChange = (event) => {
        let newPlayer = parseInt(event.target.value)
        if (newPlayer >= 0 && newPlayer < this.state.numPlayers) {
            this.setState({player: newPlayer});
        } else {
            this.setState({player: 0});
        }
        event.preventDefault()
    }

    handlePlayer = (event) => {
        event.preventDefault()
    }

    LogState = () => {
        console.log(JSON.stringify(this.state))
    }

    render() {
        return (
            <div>
                {/* <div className = 'deck' src = {CardCover}>yo</div> */}
                <div>Player {this.state.player}</div>
                <button onClick = {this.Shuffle} draggable="true">Shuffle</button>
                <button onClick = {this.Draw.bind(this, 0)}>Draw P0</button>
                <button onClick = {this.Draw.bind(this, 1)}>Draw P1</button>
                <button onClick = {this.Draw.bind(this, 2)}>Draw P2</button>
                <button onClick = {this.Draw.bind(this, 3)}>Draw P3</button>
                <form onSubmit={this.handleDeal}>
                    <label>
                    NumCards
                    <input 
                        type="text" 
                        name="numDeal"
                        value={this.state.numDeal} 
                        onChange={this.handleDealChange} />
                    </label>
                    <input type="submit" value="Deal!" />
                </form>
                <form onSubmit={this.handlePlayer}>
                    <label>
                    Player
                    <input 
                        type="text" 
                        name="numDeal"
                        value={this.state.player} 
                        onChange={this.handlePlayerChange} />
                    </label>
                    <input type="submit" value="Set Player" />
                </form>
                <button onClick = {this.LogState}>Log State</button>



                <div className="row">
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column">
                        <h3>Player 4</h3>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>

                <div className="row">
                    <div className="column"></div>
                    <div className="column">
                        <h3 className="player">Player 3</h3>
                    </div>
                    <div className="column">
                        {this.state.playerHands[4].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(4)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column">
                        <h3 className="player">Player 5</h3>   
                    </div>
                    <div className="column"></div>
                </div>

                <div className="row">
                    <div className="column"></div>
                    <div className="column">
                        {this.state.playerHands[3].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(3)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column"></div>
                    <div className="column">
                        {this.state.playerHands[5].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(5)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column"></div>
                </div>

                <div className="row">
                    <div className="column">
                        <h3 className="player">Player 2</h3>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column">
                        <h3 className="player">Player 6</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        {this.state.playerHands[2].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(2)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column">
                        {this.state.playerHands[6].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(6)===this.state.player}></Card>
                            )
                        })}
                    </div>
                </div>

                <div className="row">
                    <div className="column"></div>
                    <div className="column">
                        <h3 className="player">Player 1</h3>
                    </div>
                    <div className="column"></div>
                    <div className="column">
                        <h3 className="player">Player 7</h3>
                    </div>
                    <div className="column"></div>
                </div>

                <div className="row">
                    <div className="column"></div>
                    <div className="column">
                        {this.state.playerHands[1].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(1)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column">
                        <h3 className="player">Player 0</h3>
                    </div>
                    <div className="column">
                        {this.state.playerHands[7].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(7)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column"></div>
                </div>

                <div className="row">
                    <div className="column"></div>
                    <div className="column"></div>
                    <div className="column">
                        {this.state.playerHands[0].map((item) => {
                            return (
                                <Card id = {item} player = {this.state.player} flipped = {parseInt(0)===this.state.player}></Card>
                            )
                        })}
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>

                {/* <div>
                    {   
                        Object.keys(this.state.playerHands).map((playerNum) => {
                            return (
                                <div className="hand">
                                    {this.state.playerHands[playerNum].map((item) => {
                                        return (
                                            <Card id = {item} player = {this.state.player} flipped = {parseInt(playerNum)===this.state.player}></Card>
                                        )
                                    })}
                                    <br/>
                                    <br/>
                                </div>
    
                            )
                        })
                    }
                </div> */}
                

                

            </div>
        )
    }
}


export default Sandbox;
