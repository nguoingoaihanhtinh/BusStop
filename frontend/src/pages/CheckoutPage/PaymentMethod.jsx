import React, { useState } from 'react';
import PaymentMethodCard from '../../components/BusService/PaymentMethodCard';

const PaymentMethod = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handleChange = (e) => {
        setSelectedPaymentMethod(e.target.value); // Correct way to update state
    };

    return (
        <div className='w-full space-y-3'>
            <h6 className="text-sm text-black font-medium">
                Select payment method
            </h6>
            <div className="w-full grid grid-cols-3 gap-10">
                <PaymentMethodCard
                    selectedPayment={selectedPaymentMethod}
                    value={"mastercard"}
                    onChange={handleChange}
                    cardholderName={'Khoa Phan'}
                    cardNumber={'8888'}
                    cardImage={'https://athgroup.vn/upload/blocks/thumb_1920x0/ATH-kh%C3%A1m-ph%C3%A1-b%E1%BB%99-nh%E1%BA%ADn-di%E1%BB%87n-mastercard-4.png'}
                />
                <PaymentMethodCard
                    selectedPayment={selectedPaymentMethod}
                    value={"creditcard"}
                    onChange={handleChange}
                    cardholderName={'Khoa Phan'}
                    cardNumber={'8888'}
                    cardImage={'https://rubee.com.vn/wp-content/uploads/2021/05/logo-tp-bank.jpg'}
                />
                <PaymentMethodCard
                    selectedPayment={selectedPaymentMethod}
                    value={"paypal"}
                    onChange={handleChange}
                    cardholderName={'Khoa Phan'}
                    cardNumber={'8888'}
                    cardImage={'https://burgerprints.com/wp-content/uploads/2024/10/lam-the-paypal-2.jpg'}
                />
            </div>
        </div>
    );
};

export default PaymentMethod;
