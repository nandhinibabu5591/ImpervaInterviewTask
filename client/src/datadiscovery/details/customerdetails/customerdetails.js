import React, { useContext } from 'react';
import CustomerContext from '../../../lib/context';
import 'primeflex/primeflex.css';

export default function CustomerDetails() {
    const { state } = useContext(CustomerContext);
    return (
        <div className="p-grid">
            {state.customer && Object.keys(state.customer).map((attr, index) => {
                return (
                    <div key={index} className="p-col-12 p-md-6 p-lg-3">
                        <div className="attribute-name-class">{attr}</div>
                        <div className="attribute-name-value">{state.customer[attr]}</div>
                    </div>
                )
            })
            }
        </div>
    )
}