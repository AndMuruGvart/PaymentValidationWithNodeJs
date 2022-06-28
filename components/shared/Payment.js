
import {  useState } from 'react';
import CardReactFormContainer from 'card-react';
import { Button } from '@mui/material';

async function CreatePayment(number, date, cvv, amount  ) {
  
  const response = await fetch('http://localhost:8000/api/users', {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        number: number,
        date: date,
        cvv:  cvv,
        amount: amount,
      })
  });
  if (response.ok === true) {
    const payment = await response.json();
}
}

const Payment = () => {
  const [cardNumberValue, setCardNumberValue]=useState('');
  const [cardDataValue, setCardDataValue]=useState( {string:'', booleanDate: false});
  const [cardCVCValue, setCardCVCValue]=useState('');
  const [cardAmountValue, setCardAmountValue]=useState({string:'', booleanAmount: true});




  const handleCardChange = (event) => {
    setCardNumberValue(event.target.value);
  }

  const handleDataChange = (event) => {
    let string=String(event.target.value);
    string = string.replace(/\s/g, '');
    if (string.length==7) {
      let date=new Date();
      let currentYear=date.getFullYear()-2000;
      let currentMonth=date.getMonth();

      let month=Number(string.slice(0,2));
      let year=Number(string.slice(5,7));
      let booleanDate;
        if (month<=12) {
            if (((year>currentYear)&&((year-currentYear)<3))||((year-currentYear)==3)&&(month<=(currentMonth+1)))  booleanDate=true;
          else if ((currentYear==year)&&(month>=(currentMonth+1))) {
            booleanDate=true;
          } else {
            booleanDate=false;
          };
        } else {
          booleanDate=false;
        }
      setCardDataValue({string:string, booleanDate: booleanDate});
    } else setCardDataValue({string:string, booleanDate: false});
  }

  const handleCVCChange = (event) => {
    setCardCVCValue(event.target.value);
  }

  const handleAmountChange = (event) => {
    let string=String(event.target.value);
    if (string.match(/[^\d]+/)) setCardAmountValue({string:string, booleanAmount: true}); else setCardAmountValue({string:string, booleanAmount: false});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const number=document.getElementById('cardNumber');
    const date=document.getElementById('date');
    const cvv=document.getElementById('CVV');
    const amount=document.getElementById('amount');

    CreatePayment(number.value, date.value, cvv.value, amount.value  )

  }
  

  return (
    <div>
      <div id='card-wrapper'></div>
      <CardReactFormContainer


      container="card-wrapper" // required

      formInputsNames={
        {
          number: 'CCnumber', 
          expiry: 'CCexpiry',
          cvc: 'CCcvc', 
          name: 'CCname' 
        }
      }

      initialValues= {
        {
          number: '', 
          cvc: '', 
          expiry: '', 
        }
      }

      classes={
        {
          valid: 'valid-input', 
          invalid: 'invalid-input' 
        }
      }

      formatting={true} 
      >

      <form id="useForm" onSubmit={handleSubmit}>

          <input id="cardNumber"
            placeholder="Card number"
            name="CCnumber"
            type="text"
            className="form-input rmb-2 rmt-5"
            onInput={handleCardChange}
            />
            { cardNumberValue.length>0 &&
              <div className='alert-danger'>
                {  cardNumberValue.length !== 19 && <p>Card should contain 16 digits</p> }
              </div>
            }
          <input id="date"
            placeholder="MM/YYYY"
            type="text"
            name="CCexpiry"
            onInput={handleDataChange}
            className="form-input rmb-2"
          />
          { cardDataValue.string.length>0 &&
              <div className='alert-danger'>
                {  !cardDataValue.booleanDate && <p>Data is invalid</p> }
              </div>
            }
          <input id="CVV"
            placeholder="CVV"
            type="text"
            name="CCcvc"
            className="form-input rmb-2"
            onInput={handleCVCChange}
          />
            { cardCVCValue.length>0 &&
              <div className='alert-danger'>
                {  cardCVCValue.length !== 3 && <p>CVC contains 3 digits</p> }
              </div>
            }
          <input id="amount"
            placeholder="Amount"
            type="text"
            name="amount"
            className="form-input rmb-4"
            onInput={handleAmountChange}
          />
          { cardAmountValue.string.length>0 &&
              <div className='alert-danger'>
                {  cardAmountValue.booleanAmount && <p>Only digits applicable</p> }
              </div>
            }

          <Button
            disabled={ cardNumberValue.length !== 19 || (cardCVCValue.length !== 3 ) || cardAmountValue.booleanAmount || !cardDataValue.booleanDate }
            type="submit"
            className="btn-color effect"
            >
              Оплатить
          </Button>
      </form>

      </CardReactFormContainer>

    </div>
    
  )
}

export default Payment;
