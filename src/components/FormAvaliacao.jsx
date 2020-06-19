import React from 'react';

export default class FormAvaliacao extends React.Component {
  render() {
    const { onSubmitHandler, changeHandler } = this.props;
    return (
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <span>E-MAIL</span>
          <input type="email" className="form-control" name="email" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <input
            placeholder="Avaliação"
            name="nota"
            type="number"
            min={0}
            max={5}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <textarea
            data-testid="product-detail-evaluation"
            className="form-control"
            name="text"
            rows="3"
            onChange={changeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary mx-1">Avalie</button>
      </form>
    );
  }
}
