import React, { Suspense, lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomerDetails from './customerdetails/customerdetails';
import OrderDetails from './orders/order';
import PaymentInfo from './payments/payment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        color: '#006161',
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const Loading = () => <div>Loading...</div>;

export default function DetailsPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="customerdetails">
                    <Typography className={classes.heading}>Customer Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomerDetails />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="orderdetails">
                    <Typography className={classes.heading}>Order Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <OrderDetails />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="paymentdetails">
                    <Typography className={classes.heading}>Payment Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PaymentInfo />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}