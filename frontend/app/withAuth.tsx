import React from 'react';

const withAuth = (WrappedComponent: React.FC) => {
    const HOC: React.FC = (props) => {
        const token = localStorage.getItem('token');

        React.useEffect(() => {
            if (!token) {
                window.location.href = '/login';
            }
        }, [token]);

        return <WrappedComponent {...props} />;
    };

    return HOC;
};

export default withAuth;