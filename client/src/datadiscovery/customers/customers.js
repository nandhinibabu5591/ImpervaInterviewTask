import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './customers.css';
import history from '../../lib/history';
import DisplayMessage from '../../lib/message';
import CustomerContext from '../../lib/context';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

export default function CustomerList() {
    const [customers, setCustomers] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMounted = useRef(null);
    const [msg, setMsg] = React.useState(null);
    const { dispatch } = useContext(CustomerContext);

    const changeInputValue = (newValue) => {
        dispatch({ type: 'UPDATE_INPUT', data: newValue, });
    };

    useEffect(() => {
        isMounted.current = true;
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('/api/customers', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        history.push('/');
                        setMsg({ life: 5000, severity: 'error', summary: 'Attention: ', detail: 'Please login to proceed!' })
                    } else {
                        setMsg({ severity: 'error', summary: 'Error in: ', detail: 'while fetching customers list record' })
                    }
                } else {
                    const data = await response.json()
                    setCustomers(data);
                    setLoading(false);
                    setSelectedCustomer(data[0]);
                    changeInputValue(data[0]);
                }
            });
    }, []);

    const loadingText = () => {
        return <span className="loading-text"></span>;
    }

    const headerTempalte = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Customers</span>
                {rowData.customerName}
            </React.Fragment>
        );
    };
    const tableheader = (
        <div className="table-header">
            List of Customers
        </div>
    );
    const onRowSelect = (event) => {
        console.log(event)
        changeInputValue(event.data);
        setSelectedCustomer(event.data);
    }

    return (
        <div className="datatable-filter">
            {msg && <DisplayMessage message={msg} />}
            <div className="card">
                {customers && <DataTable value={customers} loading={loading} scrollable selectionMode="single" scrollHeight="670px"
                    header={tableheader} className="p-datatable-customers" selection={selectedCustomer} onRowSelect={onRowSelect}>
                    <Column field="customerName" header="Customers" body={headerTempalte} loadingBody={loadingText} filter filterPlaceholder="Search.." />
                </DataTable>}
            </div>
        </div>
    );
}
