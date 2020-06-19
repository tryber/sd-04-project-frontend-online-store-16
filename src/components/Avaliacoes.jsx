import React from 'react';
import FormAvalicao from './FormAvaliacao';

export default class Avaliacoes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avaliacoes: [],
      nota: 0,
      email: '',
      text: '',
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    const avaliacoes = JSON.parse(localStorage.getItem(`${id}`));
    console.log(avaliacoes);
    if (avaliacoes) {
      this.setState({ avaliacoes });
    }
  }

  componentDidUpdate() {
    const { id } = this.props;
    const { avaliacoes } = this.state;
    localStorage.setItem(`${id}`, JSON.stringify(avaliacoes));
  }

  onSubmitHandler(event) {
    const { nota, email, text } = this.state;
    event.preventDefault();
    this.setState((state) => ({ avaliacoes: [...state.avaliacoes, { nota, email, text }] }));
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { avaliacoes } = this.state;
    return (
      <div>
        <div className="card mb-3" style={{ maxWidth: '500px' }}>
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Avalie este produto</h5>
                <FormAvalicao
                  changeHandler={this.changeHandler}
                  onSubmitHandler={this.onSubmitHandler}
                />
                <br />
                <h5 className="card-title">avaliações</h5>
                <ul className="list-group">
                  {avaliacoes.map((av) => (
                    <li className="list-group-item">
                      {`${av.email} NOTA: ${av.nota}
                      ${av.text}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
