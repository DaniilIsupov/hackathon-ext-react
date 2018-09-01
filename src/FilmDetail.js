import React, { Component } from 'react';
import './FilmDetail.css'

class FilmDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: this.props.detail
        }
    }

    render() {
        return (
            <div className="detailWrapper">
                <a onClick={this.props.handleShowFilms}>Назад</a>
                {
                    this.state.detail.cinema.map(item => {
                        return (
                            <div>
                                <table>
                                    <tr>
                                        <td colSpan={2}>{item.name}</td>
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
