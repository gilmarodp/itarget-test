'use client'

import React, { useState, useEffect } from 'react';
import withAuth from "@/app/withAuth";

const RegistrationList: React.FC = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRegistrations, setTotalRegistrations] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);
    const [eventos, setEventos] = useState<string[]>([]);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/registration?name=${nameFilter}&page=${currentPage}&per_page=${perPage}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                await response.json().then(response => {
                    const data = response.data
                    setRegistrations(data);
                    setTotalRegistrations(response.total);
                    setPerPage(response.per_page);
                    setLastPage(response.last_page);
                    setCurrentPage(response.current_page)
                });
            } catch (error) {
                console.error('Error fetching registrations:', error);
            }
        };


        const fetchEventos = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                console.error('Error fetching eventos:', error);
            }
        };

        fetchRegistrations();
        fetchEventos();
    }, [nameFilter, currentPage, perPage]);

    const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f2f5'
        }}>
            <form style={{
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '90vw'
            }}>
                <h2 style={{textAlign: 'center'}}>Incrições realizadas</h2>
                <h2 style={{textAlign: 'center'}}>
                    <button
                        style={{
                            width: '150px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            cursor: 'pointer'
                        }}
                        onClick={() => window.location.href = '/inscricoes'}
                        type={'button'}
                    >
                        Adicionar
                    </button>
                </h2>
                <div style={{display: 'flex', marginBottom: '20px', justifyContent: 'space-evenly'}}>
                    <div>
                        <label htmlFor="nameFilter" style={{display: 'block', marginBottom: '5px'}}>Nome</label>
                        <input
                            type="text"
                            id="nameFilter"
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                        />
                        <span style={{marginRight: '10px'}}>Total de registros: {totalRegistrations}</span>
                        <span style={{marginRight: '10px'}}>Última página: {lastPage}</span>
                        <span style={{marginRight: '10px'}}>Registros por página: {perPage}</span>
                        <span style={{marginRight: '10px'}}>Página atual: {currentPage}</span>
                    </div>
                    <div>
                        <label htmlFor="perPage" style={{display: 'block', marginBottom: '5px'}}>Per Page</label>
                        <select
                            id="perPage"
                            value={perPage}
                            onChange={(event) => setPerPage(Number(event.target.value))}
                            style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>

                <table style={{marginBottom: '20px', width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                    <tr style={{backgroundColor: '#f0f2f5'}}>
                        <th style={{padding: '10px', border: '1px solid #ccc'}}>#</th>
                        <th style={{padding: '10px', border: '1px solid #ccc'}}>Nome</th>
                        <th style={{padding: '10px', border: '1px solid #ccc'}}>CPF</th>
                        <th style={{padding: '10px', border: '1px solid #ccc'}}>Email</th>
                        <th style={{padding: '10px', border: '1px solid #ccc'}}>Evento</th>
                        <th style={{padding: '10px', border: '1px solid #ccc'}}>Criado em</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registrations.map(registration => (
                        <tr key={registration.id}>
                            <td style={{padding: '10px', border: '1px solid #ccc'}}>{registration.id}</td>
                            <td style={{padding: '10px', border: '1px solid #ccc'}}>{registration.name}</td>
                            <td style={{padding: '10px', border: '1px solid #ccc'}}>{registration.cpf}</td>
                            <td style={{padding: '10px', border: '1px solid #ccc'}}>{registration.email}</td>
                            <td style={{
                                padding: '10px',
                                border: '1px solid #ccc'
                            }}>{eventos.find(evento => evento.id === registration.event_id)?.name}</td>
                            <td style={{padding: '10px', border: '1px solid #ccc'}}>{registration.created_at}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div style={{display: 'flex', justifyContent: 'space-between', gap: 10}}>
                    <button onClick={() => handlePageChange(1)} style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        cursor: 'pointer'
                    }} type={'button'}>
                        {"Primeira <|"}
                    </button>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        cursor: 'pointer'
                    }} type={'button'}>
                        {"< Anterior"}
                    </button>
                    <button onClick={() => handlePageChange(currentPage + 1)} style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        cursor: 'pointer'
                    }} type={'button'}>
                        {"Próximo >"}
                    </button>
                    <button onClick={() => handlePageChange(lastPage)} style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        cursor: 'pointer'
                    }} type={'button'}>
                        {"Última >|"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default withAuth(RegistrationList);