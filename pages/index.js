

import Payment from 'components/shared/Payment';

const handleRegister = data => {
  alert(JSON.stringify(data));
}

const Home = () => (

    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Fill the payment fields</h1>
          <Payment
            onSubmit={handleRegister}
          />
        </div>
      </div>
    </div>
)

export default Home
