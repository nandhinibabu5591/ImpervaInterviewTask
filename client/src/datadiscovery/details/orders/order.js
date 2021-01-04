import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ShoppingCartTwoTone from '@material-ui/icons/ShoppingCartTwoTone';
import Settings from '@material-ui/icons/Settings';
import LocalShipping from '@material-ui/icons/LocalShipping';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CustomerContext from '../../../lib/context';
import history from '../../../lib/history';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './order.css';
import DisplayMessage from '../../../lib/message';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        paper: {
            padding: '6px 16px',
        },
    },
}));

export default function OrderDetails() {
    const classes = useStyles();
    const { state } = useContext(CustomerContext);
    const [orders, setOrders] = useState(null);
    const [msg, setMsg] = useState(null);
    const [uniqueorders, setuniqueorders] = useState(null);
    const isMounted = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isMounted.current = true;
        setLoading(true);
        if (state.customer.customerNumber) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(`/api/orders/${state.customer.customerNumber}`, requestOptions)
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
                        setOrders(data);
                        setuniqueorders(distinctorders(data, 'orderNumber'));
                        setLoading(false);
                    }
                });
            return () => isMounted.current = false;
        }
    }, [state.customer]);

    const distinctorders = (ObjJSON, prop) => {
        return ObjJSON ? ObjJSON.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        }) : [];
    }

    const setLabel = (item, index) => {
        return (
            <React.Fragment>
                <span key={index} className="p-text-center">
                    Order Number: {item.orderNumber} <span className="p-text-bold">({item.status})</span>
                    <div className="p-text-italic">{item.orderDate}</div>
                </span>
            </React.Fragment>
        )
    };

    const getIcon = (status) => {
        if (status === 'Ordered') {
            return <ShoppingCartTwoTone />
        }
        else if (status === 'Processing') {
            return <Settings />
        }
        else if (status === 'Shipped') {
            return <LocalShipping />
        }
        else if (status === 'Delivered') {
            return <CheckCircle />
        }
    };

    return (
        <div className={classes.root}>
            { msg && <DisplayMessage message={msg} />}
            {uniqueorders && uniqueorders.map((item, index) => {
                return (
                    <div key={index} className="p-mb-2">
                        <Chip
                            icon={getIcon(item.status)}
                            label={setLabel(item)}
                            clickable
                            color="primary"
                            loading
                            variant='default' />
                    </div>
                )
            })
            }
            <div className="p-grid">
                <div className="p-col-6">
                    {
                        uniqueorders && uniqueorders.map((item, index) => {
                            return (
                                <React.Fragment>
                                    <Timeline key={index} align="alternate">
                                        <TimelineItem>
                                            <TimelineOppositeContent>
                                                <Typography color="textSecondary">{item.orderDate}</Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Paper elevation={3} className={classes.paper}>
                                                    {getIcon(item.status)} <Typography>{setLabel(item)}</Typography>
                                                </Paper>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className="p-col-6">
                    <div className="datatable-scroll">
                        <DataTable value={orders} scrollable scrollHeight="600px" style={{ width: '600px' }} loading={loading}>
                            <Column field="productCode" header="Code" headerStyle={{ width: '250px' }} columnKey="productCode"></Column>
                            <Column field="productName" header="Name" headerStyle={{ width: '250px' }} columnKey="productName"></Column>
                            <Column field="productLine" header="productLine" headerStyle={{ width: '250px' }} columnKey="productLine"></Column>
                            <Column field="priceEach" header="priceEach" headerStyle={{ width: '250px' }} columnKey="priceEach"></Column>
                            <Column field="quantityOrdered" header="quantityOrdered" headerStyle={{ width: '250px' }} columnKey="quantityOrdered"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}