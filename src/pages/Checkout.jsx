import React from 'react';

const CartReview = (props) => {
  // const { cart, removeFromCart } = props;

  return (
    <section className="my-3">
      <h5>Revise seus produtos</h5>
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action">1 x Dapibus ac facilisis in</button>
        <button type="button" className="list-group-item list-group-item-action">1 x Morbi leo risus</button>
        <button type="button" className="list-group-item list-group-item-action">4 x Porta ac consectetur ac</button>
        <button type="button" className="list-group-item list-group-item-action">1 x Vestibulum at eros</button>
      </div>
      <div className="row justify-content-end m-0 mt-2">
        <h5>Total: R$ 0.00</h5>
      </div>
    </section>
  )
}

const BuyerInfo = ({ changeFormState, formState }) => {
  return (
    <section className="mb-5">
      <h5>Informacoes do comprador</h5>
      <form>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              name="fullName"
              data-testid="checkout-fullname"
              className="form-control"
              placeholder="Nome Completo"
              onChange={changeFormState}
              value={formState.fullName}
            />
          </div>
          <div className="col">
            <input
              type="text"
              data-testid="checkout-cpf"
              className="form-control"
              placeholder="CPF"
              onChange={changeFormState}
              value={formState.cpf}
            />
          </div>
          <div className="col">
            <input
              type="text"
              data-testid="checkout-email"
              className="form-control"
              placeholder="Email"
              onChange={changeFormState}
              value={formState.email}
            />
          </div>
          <div className="col">
            <input
              type="text"
              data-testid="checkout-phone"
              className="form-control"
              placeholder="Telefone"
              onChange={changeFormState}
              value={formState.phone}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              data-testid="checkout-cep"
              className="form-control"
              placeholder="CEP"
              onChange={changeFormState}
              value={formState.cep}
            />
          </div>
          <div className="col">
            <input
              type="text"
              data-testid="checkout-address"
              className="form-control"
              placeholder="Endereco"
              onChange={changeFormState}
              value={formState.address}
            />
          </div>
        </div>
      </form>
    </section>
  )
}

const PaymentInfo = ({ changeFormState, formState }) => (
  <section>
    <h5>Metodo de pagamento</h5>
    <form value={formState.paymentMethod}>
      <div className="form-check form-check-inline">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="a"
          value="boleto"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="a">Boleto</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="b"
          value="visa"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="b">Visa</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="c"
          value="mastercard"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="c">MasterCard</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          name="paymentMethod"
          className="form-check-input"
          type="radio"
          id="d"
          value="elo"
          onChange={changeFormState}
        />
        <label className="form-check-label" htmlFor="d">Elo</label>
      </div>
    </form>
  </section>
)

//Preciso receber como props: estado do carrinho
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      paymentMethod: 'boleto',
    }
    this.changeFormState = this.changeFormState.bind(this)
  }

  changeFormState(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  render() {
    const { fullName, email, cpf, phone, cep, address, paymentMethod } = this.state;
    return (
      <div className="container">
        <CartReview />
        <BuyerInfo changeFormState={this.changeFormState} formState={{ fullName, email, cpf, phone, cep, address }} />
        <PaymentInfo changeFormState={this.changeFormState} formState={{ paymentMethod }} />
        <div className="row justify-content-center">
          <button className="btn btn-primary btn-lg">Comprar</button>
        </div>
      </div>
    );
  }
}

export default Checkout;
