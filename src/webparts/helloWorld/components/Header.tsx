import * as React from 'react';

const Header: React.FC = () => {

    return (
        <div
            style={{
                background:
                    'linear-gradient(135deg,#2563EB,#3B82F6)',
                borderRadius: '20px',
                padding: '32px',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow:
                    '0 8px 24px rgba(37,99,235,0.25)',
                marginBottom: '24px'
            }}
        >

            <div>

                <h1
                    style={{
                        margin: 0,
                        fontSize: '48px',
                        fontWeight: 700
                    }}
                >
                    Holiday Dashboard
                </h1>

                <div
                    style={{
                        marginTop: '8px',
                        fontSize: '22px',
                        opacity: 0.95
                    }}
                >
                    Employee Self-Service Portal
                </div>

                <div
                    style={{
                        marginTop: '12px',
                        fontSize: '15px',
                        opacity: 0.85
                    }}
                >
                    Manage holidays, leave balances and
                    time-off requests.
                </div>

            </div>

            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <div
                    style={{
                        fontSize: '56px'
                    }}
                >
                    📅
                </div>

                <div
                    style={{
                        marginTop: '8px',
                        fontSize: '18px',
                        fontWeight: 600
                    }}
                >
                    Company Holidays
                </div>
            </div>

        </div>
    );

};

export default Header;