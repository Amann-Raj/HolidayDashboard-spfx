import * as React from 'react';

import Header from './Header';
import EmployeeView from './EmployeeView';
import HRView from './HRView';

import { IHelloWorldProps } from './IHelloWorldProps';

const HelloWorld: React.FC<IHelloWorldProps> = ({
  context
}) => {

  const [role, setRole] =
    React.useState<string>('Employee');

  return (
    <>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '16px'
        }}
      >
        <img
          src={`${context.pageContext.web.absoluteUrl}/SiteAssets/capgemini-logo.svg`}
          alt="Capgemini Logo"
          style={{
            maxWidth: '260px',
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>

      <Header />

      <div
        style={{
          padding: '20px',
          backgroundColor: '#f5f7fa',
          minHeight: '100vh'
        }}
      >

        <div
          style={{
            display: 'inline-flex',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '4px',
            boxShadow:
              '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '20px'
          }}
        >
          <button
            onClick={() =>
              setRole('Employee')
            }
            style={{
              backgroundColor:
                role === 'Employee'
                  ? '#0078d4'
                  : 'transparent',

              color:
                role === 'Employee'
                  ? '#ffffff'
                  : '#323130',

              border: 'none',
              padding:
                '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition:
                'all 0.2s ease'
            }}
          >
            Employee
          </button>

          <button
            onClick={() =>
              setRole('HR')
            }
            style={{
              backgroundColor:
                role === 'HR'
                  ? '#0078d4'
                  : 'transparent',

              color:
                role === 'HR'
                  ? '#ffffff'
                  : '#323130',

              border: 'none',
              padding:
                '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition:
                'all 0.2s ease'
            }}
          >
            HR
          </button>
        </div>

        {
          role === 'HR'
            ? (
              <HRView
                context={context}
              />
            )
            : (
              <EmployeeView
                context={context}
              />
            )
        }
      </div>
    </>
  );

};

export default HelloWorld;