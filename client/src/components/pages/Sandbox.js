import React, { Component } from 'react';
import CardDeckImage from './images/deck.png';
import Cover from './images/cover.png';
import CardCover from './images/cardcover.png';
import './Sandbox.css';
import deck2C from "./images/Cards/2C.png"
import deck2D from "./images/Cards/2D.png"
import deck2H from "./images/Cards/2H.png"
import deck2S from "./images/Cards/2S.png"
import deck3C from "./images/Cards/3C.png"
import deck3D from "./images/Cards/3D.png"
import deck3H from "./images/Cards/3H.png"
import deck3S from "./images/Cards/3S.png"
import deck4C from "./images/Cards/4C.png"
import deck4D from "./images/Cards/4D.png"
import deck4H from "./images/Cards/4H.png"
import deck4S from "./images/Cards/4S.png"
import deck5C from "./images/Cards/5C.png"
import deck5D from "./images/Cards/5D.png"
import deck5H from "./images/Cards/5H.png"
import deck5S from "./images/Cards/5S.png"
import deck6C from "./images/Cards/6C.png"
import deck6D from "./images/Cards/6D.png"
import deck6H from "./images/Cards/6H.png"
import deck6S from "./images/Cards/6S.png"
import deck7C from "./images/Cards/7C.png"
import deck7D from "./images/Cards/7D.png"
import deck7H from "./images/Cards/7H.png"
import deck7S from "./images/Cards/7S.png"
import deck8C from "./images/Cards/8C.png"
import deck8D from "./images/Cards/8D.png"
import deck8H from "./images/Cards/8H.png"
import deck8S from "./images/Cards/8S.png"
import deck9C from "./images/Cards/9C.png"
import deck9D from "./images/Cards/9D.png"
import deck9H from "./images/Cards/9H.png"
import deck9S from "./images/Cards/9S.png"
import deckTC from "./images/Cards/10C.png"
import deckTD from "./images/Cards/10D.png"
import deckTH from "./images/Cards/10H.png"
import deckTS from "./images/Cards/10S.png"
import deckJC from "./images/Cards/JC.png"
import deckJD from "./images/Cards/JD.png"
import deckJH from "./images/Cards/JH.png"
import deckJS from "./images/Cards/JS.png"
import deckQC from "./images/Cards/QC.png"
import deckQD from "./images/Cards/QD.png"
import deckQH from "./images/Cards/QH.png"
import deckQS from "./images/Cards/QS.png"
import deckKC from "./images/Cards/KC.png"
import deckKD from "./images/Cards/KD.png"
import deckKH from "./images/Cards/KH.png"
import deckKS from "./images/Cards/KS.png"
import deckAC from "./images/Cards/AC.png"
import deckAD from "./images/Cards/AD.png"
import deckAH from "./images/Cards/AH.png"
import deckAS from "./images/Cards/AS.png"
import deckSJ from "./images/Cards/SJ.png"
import deckBJ from "./images/Cards/BJ.png"
import Draggable from 'react-draggable';
import Card from './Card.js'

const num_to_rank = {0: "2", 1: "3", 2: "4", 3: "5", 4: "6", 5: "7", 6: "8", 7: "9", 8: "T", 9: "J", 10: "Q", 11: "K", 12: "A"}
const rank_to_num = {"2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "T": 8, "J": 9, "Q": 10, "K": 11, "A": 12}
const num_to_suit = {0: "C", 1: "D", 2: "H", 3: "S"}
const suit_to_num = {"C": 0, "D": 1, "H": 2, "S": 3}
const cardToImage = {
    "2C":deck2C, "2D":deck2D, "2H":deck2H, "2S":deck2S, 
    "3C":deck3C, "3D":deck3D, "3H":deck3H, "3S":deck3S, 
    "4C":deck4C, "4D":deck4D, "4H":deck4H, "4S":deck4S, 
    "5C":deck5C, "5D":deck5D, "5H":deck5H, "5S":deck5S, 
    "6C":deck6C, "6D":deck6D, "6H":deck6H, "6S":deck6S, 
    "7C":deck7C, "7D":deck7D, "7H":deck7H, "7S":deck7S, 
    "8C":deck8C, "8D":deck8D, "8H":deck8H, "8S":deck8S, 
    "9C":deck9C, "9D":deck9D, "9H":deck9H, "9S":deck9S, 
    "TC":deckTC, "TD":deckTD, "TH":deckTH, "TS":deckTS, 
    "JC":deckJC, "JD":deckJD, "JH":deckJH, "JS":deckJS, 
    "QC":deckQC, "QD":deckQD, "QH":deckQH, "QS":deckQS, 
    "KC":deckKC, "KD":deckKD, "KH":deckKH, "KS":deckKS, 
    "AC":deckAC, "AD":deckAD, "AH":deckAH, "AS":deckAS,
}

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
