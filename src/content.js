import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import FilmDetail from './FilmDetail';

import './content.css';

import $ from 'jquery';

const customStyles = {
    content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        'max-height': '80vh',
        padding: '5px 20px 20px 20px'
    },
    overlay: {
        'z-index': '999999',
        position: 'absolute'
    }
};

class ContentReact extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            detail: {}
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentWillMount() {
        if (document.location.href.indexOf('kinopoisk.ru') > -1) {
            var title = $('.moviename-big').text();
            window.chrome.runtime.sendMessage({ msg: 'films' }, (response) => {
                for (let i = 0; i < response.films.length; i++) {
                    if (response.films[i].title === title) {
                        console.log(response.films[i]);
                        this.setState({ detail: response.films[i] });
                        this.openModal();
                    }
                }
            });
        }
    }

    render() {
        return (
            <div>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Film Modal"
                >
                    <div>
                        <span className="closeModalFilm" onClick={this.closeModal}>&times;</span>
                        <p>Этот фильм вы можете посмотреть в одном из следующих кинотеатрах.</p>
                        <FilmDetail
                            detail={this.state.detail}
                            content={true}
                        />
                    </div>
                </ReactModal>
            </div>
        )
    }
}

const app = document.createElement('div');
app.id = "wrapperModalFilm";
document.body.appendChild(app);
ReactDOM.render(<ContentReact />, app);