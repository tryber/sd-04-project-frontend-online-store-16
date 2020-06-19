import React from 'react';

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

  componentDidUpdate() {
    const { id } = this.props;
    const { avaliacoes } = this.state;
    localStorage.setItem(`${id}`, JSON.stringify(avaliacoes));
  }

  onSubmitHandler(event) {
    const { nota, email, text, avaliacoes } = this.state;
    event.preventDefault();
    console.log(nota, email, text);
    this.setState({ avaliacoes: [...avaliacoes, { nota, email, text }] });
    console.log(avaliacoes);
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div className="card mb-3" style={{ maxWidth: '500px' }}>
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="card-body">
                <h5 data-testid="product-detail-name" className="card-title">Avalie este produto</h5>
                <form onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                    <span>E-MAIL</span>
                    <input type="email" className="form-control" name="email" onChange={this.changeHandler} />
                  </div>
                  <div className="form-group">
                    <input placeholder="Avaliação" name="nota" type="number" min={0} max={5} onChange={this.changeHandler} />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" name="text" rows="3" onChange={this.changeHandler} />
                  </div>
                  <button type="submit" className="btn btn-primary mx-1">Avalie</button>
                </form>
                <ul className="list-group">
                  {/* {state.attributes.map((att) => <li className="list-group-item">{`${att.name}: ${att.value_name}`}</li>)} */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
