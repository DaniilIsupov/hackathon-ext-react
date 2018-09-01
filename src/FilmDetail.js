import React, { Component } from 'react';
import './FilmDetail.css'

class FilmDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: this.props.detail,
            showBack: !(this.props.hasOwnProperty('content') && this.props.content)
        }
    }

    render() {
        return (
            <div className="detailWrapper">
                {this.state.showBack && <a className="backButtonFilm" onClick={this.props.handleShowFilms}>Назад</a>}
                <p>Рейтинг фильма: {this.state.detail.rating}</p>
                {
                    this.state.detail.cinema.map(item => {
                        return (
                            <div className="cinema-tables">
                                <table className="customTableFilm">
                                    <tr className="customTRFilm">
                                        <td className="customTDFilm title" colSpan={2}>{item.name}</td>
                                    </tr>
                                    {item.time.map((val, index) => {
                                        return (
                                            <tr className="customTRFilm">
                                                <td className="customTDFilm">{val}</td>
                                                <td className="customTDFilm">{item.room[index]}</td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        )
                    })
                }
            </div >
        );
    }
}

export default FilmDetail;
