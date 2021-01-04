import React, { useContext, useRef, useState, useEffect } from 'react';
import CustomerContext from '../../../lib/context';
import history from '../../../lib/history';
import DisplayMessage from '../../../lib/message';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function PaymentInfo() {
    const { state } = useContext(CustomerContext);
    const [payment, setPayment] = useState(null);
    const isMounted = useRef(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        isMounted.current = true;
        setLoading(true);
        if (state.customer.customerNumber) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(`/api/payment/${state.customer.customerNumber}`, requestOptions)
                .then(async response => {
                    if (!response.ok) {
                        if (response.status === 401) {
                            history.push('/');
                            setMsg({ life: 5000, severity: 'error', summary: 'Attention: ', detail: 'Please login to proceed!' })
                        } else {
                            setMsg({ severity: 'error', summary: 'Error in: ', detail: 'while fetching payment details' })
                        }
                    } else {
                        const data = await response.json()
                        setPayment(data);
                        setLoading(false);
                    }
                });
            return () => isMounted.current = false;
        }
    }, [state.customer]);

    return (
        <div> { msg && <DisplayMessage message={msg} />}
            <DataTable value={payment} scrollable scrollHeight="200px" loading={loading}>
                <Column field="customerNumber" header="Customer"></Column>
                <Column field="checkNumber" header="Check Number"></Column>
                <Column field="paymentDate" header="Payment Date"></Column>
                <Column field="amount" header="Amount"></Column>
            </DataTable>
        </div>
    )
}