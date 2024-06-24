'use client';

import React, { useState, useEffect } from 'react';
import withAuth from "@/app/withAuth";
import InputMask from "react-input-mask";

const Page: React.FC = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [evento, setEvento] = useState('');
    const [eventos, setEventos] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
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
        fetchEventos();
    }, []);

    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    };

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleEventoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEvento(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const submitForm = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/registration`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        name: nome,
                        cpf,
                        email,
                        event_id: evento,
                    }),
                });
                if (response.ok) {
                    setSuccess('Inscrição realizada com sucesso!')
                    setError('')
                } else {
                    console.error('Error submitting form:', response.json().then(response => {
                        setSuccess('')
                        setError(response.message)
                    }));
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };
        submitForm();
    };

    // @ts-ignore
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <form onSubmit={handleSubmit} style={{
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{textAlign: 'center'}}>Novas Inscrições</h2>
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
                        onClick={() => window.location.href = '/inscricoes/list'}
                        type={'button'}
                    >
                        Ver tudo
                    </button>
                </h2>

                <p style={{color: 'green'}}>
                    {success}
                </p>

                <p style={{color: 'red'}}>
                    {error}
                </p>

                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="nome" style={{display: 'block', marginBottom: '5px'}}>Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={handleNomeChange}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="cpf" style={{display: 'block', marginBottom: '5px'}}>CPF</label>
                    <InputMask
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={handleCpfChange}
                        mask={'999.999.999-99'}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="email" style={{display: 'block', marginBottom: '5px'}}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="evento" style={{display: 'block', marginBottom: '5px'}}>Evento</label>
                    <select
                        id="evento"
                        value={evento}
                        onChange={handleEventoChange}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    >
                        <option value="">Selecione um evento</option>
                        {eventos.map(eventoOption => (
                            <option key={eventoOption.id} value={eventoOption.id}>
                                {eventoOption.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    cursor: 'pointer'
                }}>Enviar
                </button>
            </form>
        </div>
    );
};

export default withAuth(Page);