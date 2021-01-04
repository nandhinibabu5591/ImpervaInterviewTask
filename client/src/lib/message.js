import React, { useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

export default function DisplayMessage(props) {
    const msgs = useRef(null);
    useEffect(() => {  msgs.current.show(props.message) });
    return (msgs && <Messages ref={msgs} />);
}