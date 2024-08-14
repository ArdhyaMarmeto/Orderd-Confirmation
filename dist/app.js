// JSON data
const jsonData = {
    "checkout_id": "c456d2e7-45b3-492a-bdd3-8d8d234a670e",
    "created_at": "2024-08-13T12:34:56Z",
    "customer": {
        "customer_id": "123456",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "shipping_address": {
            "address_id": "654321",
            "first_name": "John",
            "last_name": "Doe",
            "company": "Example Corp",
            "address_line1": "123 Main St",
            "address_line2": "Apt 4B",
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country": "USA"
        },
        "billing_address": {
            "address_id": "654322",
            "first_name": "John",
            "last_name": "Doe",
            "company": "Example Corp",
            "address_line1": "123 Main St",
            "address_line2": "Apt 4B",
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country": "USA"
        }
    },
    "cart": {
        "items": [
            {
                "item_id": "prod_001",
                "product_name": "Wireless Headphones",
                "quantity": 2,
                "price": 99.99,
                "discount": {
                    "type": "percentage",
                    "value": 10,
                    "applied_value": 19.998
                },
                "tax": {
                    "type": "percentage",
                    "value": 8.875,
                    "applied_value": 14.135
                },
                "total_price": 194.122
            },
            {
                "item_id": "prod_002",
                "product_name": "Bluetooth Speaker",
                "quantity": 1,
                "price": 149.99,
                "discount": {
                    "type": "fixed",
                    "value": 20.00,
                    "applied_value": 20.00
                },
                "tax": {
                    "type": "percentage",
                    "value": 8.875,
                    "applied_value": 11.496
                },
                "total_price": 141.486
            }
        ],
        "sub_total": 294.991,
        "total_discount": 39.998,
        "total_tax": 25.631,
        "shipping_cost": 15.00,
        "grand_total": 295.624
    },
    "shipping_method": {
        "method_id": "ship_001",
        "method_name": "Standard Shipping",
        "cost": 15.00,
        "estimated_delivery": "2024-08-20T12:00:00Z"
    },
    "payment_method": {
        "method_id": "pay_001",
        "method_name": "Credit Card",
        "transaction_id": "txn_789012",
        "payment_status": "Authorized",
        "amount": 295.624,
        "currency": "USD"
    },
    "discounts_applied": [
        {
            "discount_id": "disc_001",
            "type": "percentage",
            "description": "Summer Sale - 10% off on Wireless Headphones",
            "value": 10,
            "applied_value": 19.998
        },
        {
            "discount_id": "disc_002",
            "type": "fixed",
            "description": "Loyalty Discount - $20 off on Bluetooth Speaker",
            "value": 20.00,
            "applied_value": 20.00
        }
    ],
    "tax_details": [
        {
            "tax_id": "tax_001",
            "type": "sales_tax",
            "description": "State Sales Tax",
            "rate": 8.875,
            "applied_value": 25.631
        }
    ],
    "order_notes": "Please leave the package at the front door.",
    "status": "Pending",
    "updated_at": "2024-08-13T12:45:00Z"
};

// Credit Card Validation
function validateCardDetails(cardNumber, expiryDate, cvv) {
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const currentDate = new Date();
    const [expMonth, expYear] = expiryDate.split('/');
    const expiry = new Date(`${expYear}-${expMonth}-01`);

    if (!cardNumberRegex.test(cardNumber)) {
        if(cardNumber === "" || cardNumber < 16){
            alert('Card number must be exactly 16 digits.');
            return false;
        }
    }
    if (expiry < currentDate) {
        alert('Expiry date cannot be in the past.');
        return false;
    }
    if (!cvvRegex.test(cvv)) {
        if(cvvRegex === "" || cvvRegex < 3)
        alert('CVV must be exactly 3 digits.');
        return false;
    }
    return true;
}

// Save Card Details to Session Storage
function saveCardDetails(cardNumber, expiryDate, cvv) {
    const cardDetails = {
        cardNumber,
        expiryDate,
        cvv
    };
    sessionStorage.setItem('savedCardDetails', JSON.stringify(cardDetails));
    alert('Card details saved successfully.');
}

// Populate Card Details from Session Storage
function populateSavedCardDetails() {
    const savedCardDetails = sessionStorage.getItem('savedCardDetails');
    if (savedCardDetails) {
        const { cardNumber, expiryDate, cvv } = JSON.parse(savedCardDetails);
        document.getElementById('card-number').value = cardNumber;
        document.getElementById('expiry-date').value = expiryDate;
        document.getElementById('cvv').value = cvv;
    }
}

// Payment Handling
function confirmOrder() {
    // Hide payment section
    document.getElementById('payment-section').classList.add('hidden');

    // Populate Thank You section with data from JSON
    const customer = jsonData.customer;
    const shippingAddress = customer.shipping_address;
    const paymentMethod = jsonData.payment_method;

    document.getElementById('customer-name').textContent = `${customer.first_name} ${customer.last_name}`;
    document.getElementById('order-id').textContent = `Order ID: ${jsonData.checkout_id}`;
    document.getElementById('order-date').textContent = `Order Date: ${new Date(jsonData.created_at).toLocaleDateString()}`;
    document.getElementById('shipping-address').textContent = `${shippingAddress.address_line1}, ${shippingAddress.address_line2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}, ${shippingAddress.country}`;
    document.getElementById('payment-method').textContent = `Credit Card ending in ****${paymentMethod.transaction_id.slice(-4)}`;
    document.getElementById('payment-amount').textContent = `Total: USD${paymentMethod.amount.toFixed(2)}`;

    // Show Thank You section
    document.getElementById('thank-you-section').classList.remove('hidden');
}

// Event Listeners
document.getElementById('save-card-details').addEventListener('click', function () {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (validateCardDetails(cardNumber, expiryDate, cvv)) {
        saveCardDetails(cardNumber, expiryDate, cvv);
    }
});

document.getElementById('pay-button').addEventListener('click', function () {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (validateCardDetails(cardNumber, expiryDate, cvv)) {
        confirmOrder();
    }
});

// Populate saved card details on page load
window.onload = populateSavedCardDetails;

function togglePaymentForm() {
    const cardPaymentForm = document.getElementById('card-payment-form');
    const codButton = document.getElementById('cod-button');
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (paymentMethod === 'card') {
        cardPaymentForm.classList.remove('hidden');
        codButton.classList.add('hidden');
    } else if (paymentMethod === 'cod') {
        cardPaymentForm.classList.add('hidden');
        codButton.classList.remove('hidden');
    } else {
        // Hide both forms if no payment method is selected
        cardPaymentForm.classList.add('hidden');
        codButton.classList.add('hidden');
    }
}

// Confirm the order and show the thank you section
function confirmOrder() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const discountCode = document.getElementById('discount-code').value;

        if (validateCardDetails(cardNumber, expiryDate, cvv, discountCode !== '')) {
            // Hide the payment section
            document.getElementById('payment-section').classList.add('hidden');
            // Show the thank you section
            document.getElementById('thank-you-section').classList.remove('hidden');
        } else {
            alert('Please check your card details and ensure a discount or gift code is applied.');
        }
    } else if (paymentMethod === 'cod') {
        // Hide the payment section for COD
        document.getElementById('payment-section').classList.add('hidden');
        // Show the thank you section
        document.getElementById('thank-you-section').classList.remove('hidden');
    } else {
        alert('Please select a payment method.');
    }
}

// Event Listener for Payment Method Change
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', togglePaymentForm);
});

// Event Listener for Confirm Order Button
document.getElementById('confirm-order-button').addEventListener('click', confirmOrder);





