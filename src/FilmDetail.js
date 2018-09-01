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
                {this.state.showBack && <a onClick={this.props.handleShowFilms}>Назад</a>}
                {
                    this.state.detail.cinema.map(item => {
                        return (
                            <div className="cinema-tables">
                                <table>
                                    <tr>
                                        <td className="title" colSpan={2}>{item.name}</td>
                                    </tr>
                                    {item.time.map((val, index) => {
                                        return (
                                            <tr>
                                                <td>{val}</td>
                                                <td>{item.room[index]}</td>
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
