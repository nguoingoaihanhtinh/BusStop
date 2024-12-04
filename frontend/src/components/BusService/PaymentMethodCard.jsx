import React from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'

const PaymentMethodCard = ({ selectedPayment, value, onChange, cardholderName, cardNumber, cardImage }) => {
  return (
    <label 
      htmlFor={`payment-method-${value}`} 
      className={`w-full flex items-end px-4 py-2 border-2 ${selectedPayment === value ? "border-indigo-500/80 bg-indigo-500/15" : "border-gray-300 bg-gray-100/40"} rounded-xl relative cursor-pointer`}
    >
      <div className="w-full flex items-center justify-between gap-7">
        <div className="flex items-center gap-x-3">
          <div className="w-fit h-16 rounded-lg">
            <img src={cardImage} alt="payment img" className="w-full h-full object-contain object-center rounded-lg" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-base text-gray-600 font-medium">{cardholderName}</h1>
            <p className="text-gray-500 text-sm font-normal">****{cardNumber.slice(-4)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {selectedPayment === value ? (
            <MdRadioButtonChecked className='w-7 h-7 text-indigo-500' />
          ) : (
            <MdRadioButtonUnchecked className='w-7 h-7 text-indigo-500/40' />
          )}
        </div>
      </div>
      <input 
        type="radio" 
        id={`payment-method-${value}`} 
        name="payment-method" 
        value={value} 
        checked={selectedPayment === value} 
        onChange={onChange} 
        className='hidden' 
      />
    </label>
  );
}

export default PaymentMethodCard;
