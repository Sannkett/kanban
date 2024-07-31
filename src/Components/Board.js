import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import add from '../icons_FEtask/add.svg';
import TDot from '../icons_FEtask/TDot.svg';

import Backlog from '../icons_FEtask/Backlog.svg';
import Todo from '../icons_FEtask/Todo.svg';
import inProgress from '../icons_FEtask/inProgress.svg';
import Done from '../icons_FEtask/Done.svg';
import Cancelled from '../icons_FEtask/Cancelled.svg';

import NoPriority from '../icons_FEtask/NoPriority.svg';
import UrgentPriority from '../icons_FEtask/UrgentPriority.svg';
import HighPriority from '../icons_FEtask/HighPriority.svg';
import MediumPriority from '../icons_FEtask/MediumPriority.svg';
import LowPriority from '../icons_FEtask/LowPriority.svg';





export default function Board({ grouping, ordering }) {
    const URL = process.env.REACT_APP_URL;

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);

    const [columns, setColumns] = useState({});

    const fetchCards = async () => {
        const url = URL;
        let response = await fetch(url);
        let data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        const organizedData = organizeTickets(data.tickets, data.users);
        setColumns(organizedData);
    };

    const organizeTickets = (tickets, users) => {
        let columns = {};

        switch (grouping) {
            case 'User':
                users.forEach(user => {
                    columns[user.name] = tickets.filter(ticket => ticket.userId === user.id);
                });
                break;


            case 'Priority':
                columns = {
                    'No priority': [],
                    'Urgent': [],
                    'High': [],
                    'Medium': [],
                    'Low': []
                };
                tickets.forEach(ticket => {
                    switch (ticket.priority) {
                        case 4:
                            columns['Urgent'].push(ticket);

                            break;
                        case 3:
                            columns['High'].push(ticket);

                            break;
                        case 2:
                            columns['Medium'].push(ticket);

                            break;
                        case 1:
                            columns['Low'].push(ticket);

                            break;
                        case 0:
                            columns['No priority'].push(ticket);

                            break;
                        default:
                            break;
                    }
                });
                break;


            case 'Status':
            default:
                columns = {
                    'Backlog': [],
                    'Todo': [],
                    'In progress': [],
                    'Done': [],
                    'Cancelled': []
                };
                tickets.forEach(ticket => {
                    if (columns[ticket.status]) {
                        columns[ticket.status].push(ticket);
                    }
                });
                break;
        }

        if (ordering === 'Based on Priority') {
            for (const key in columns) {
                columns[key].sort((a, b) => b.priority - a.priority);
            }
        } else if (ordering === 'Based on Title') {
            for (const key in columns) {
                columns[key].sort((a, b) => a.title.localeCompare(b.title));
            }
        }

        return columns;
    };

    useEffect(() => {
        fetchCards();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setColumns(organizeTickets(tickets, users));
    }, [grouping, ordering]);


    const getIcon = (key) => {
        switch (key) {
            case 'Backlog':
                return Backlog;
            case 'Todo':
                return Todo;
            case 'In progress':
                return inProgress;
            case 'Done':
                return Done;
            case 'Cancelled':
                return Cancelled;
            case 'No priority':
                return NoPriority;
            case 'Urgent':
                return UrgentPriority;
            case 'High':
                return HighPriority;
            case 'Medium':
                return MediumPriority;
            case 'Low':
                return LowPriority;
            default:
                return null;
        }
    };
    return (
        <div className='board-div'>
            {Object.keys(columns).map((columnKey) => (
                <div key={columnKey}>
                    <div className='items'>
                        <div className="backlog-items">
                            <img src={grouping === 'User' ? '' : getIcon(columnKey)} alt="" />
                            <span>{columnKey} </span>
                            <span className='length-para'>{columns[columnKey].length}</span>
                        </div>
                        <div className="backlog-img">
                            <img src={add} alt="" />
                            <img src={TDot} alt="" />
                        </div>
                    </div>
                    {columns[columnKey].map(ticket => (
                        <Cards key={ticket.id} id={ticket.id} title={ticket.title} />
                    ))}
                </div>
            ))}
        </div>
    );
}
