import React, { Component } from 'react';
import './FilmItem.css'

class FilmItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            film: this.props.film
        }
    }

    render() {
        return (
            <div class="polaroid" onClick={this.props.handleShowDetails}>
                <img src={this.state.film.image} />
                <div class="container">
                    <p>{this.state.film.title}</p>
                </div>
            </div>
        );
    }
}

export default FilmItem;
