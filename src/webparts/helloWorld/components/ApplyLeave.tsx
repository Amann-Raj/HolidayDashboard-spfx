import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import LeaveService from '../services/LeaveService';

interface IApplyLeaveProps {
  context: WebPartContext;
  isOpen: boolean;
  onClose: () => void;
  onLeaveApplied: () => void;
}

const ApplyLeave: React.FC<IApplyLeaveProps> = ({
  context,
  isOpen,
  onClose,
  onLeaveApplied
}) => {

  const [startDate, setStartDate] =
    React.useState('');

  const [endDate, setEndDate] =
    React.useState('');

  const [leaveType, setLeaveType] =
    React.useState('Vacation');

  const [comments, setComments] =
    React.useState('');

  const [error, setError] =
    React.useState('');

  const [success, setSuccess] =
    React.useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (): Promise<void> => {

    setError('');
    setSuccess('');

    if (!leaveType) {

      setError(
        'Please select Leave Type.'
      );

      return;

    }

    if (!startDate) {

      setError(
        'Please select Start Date.'
      );

      return;

    }

    if (!endDate) {

      setError(
        'Please select End Date.'
      );

      return;

    }

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {

      setError(
        'End Date cannot be earlier than Start Date.'
      );

      return;

    }

    try {

      await LeaveService.applyLeave(
        context,
        {
          employeeName:
            context.pageContext.user.displayName,

          email:
            context.pageContext.user.email,

          startDate,
          endDate,
          leaveType,

          comments,

          department: 'IT'
        }
      );

      setSuccess(
        'Leave request submitted successfully.'
      );

      onLeaveApplied();

      setStartDate('');
      setEndDate('');
      setComments('');
      setLeaveType('Vacation');

      setTimeout(() => {

        onClose();

      }, 1500);

    } catch (err) {

      console.error(err);

      setError(
        'Error submitting leave request.'
      );

    }

  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'rgba(0,0,0,0.5)',
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: '850px',
          margin: '40px auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow:
            '0 10px 25px rgba(0,0,0,0.15)'
        }}
      >
        <div
          style={{
            backgroundColor: '#0078d4',
            color: '#ffffff',
            padding: '18px 24px',
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center'
          }}
        >
          <h2
            style={{
              margin: 0
            }}
          >
            Book Time Off
          </h2>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: '24px'
          }}
        >

          {
            error && (
              <div
                style={{
                  backgroundColor:
                    '#fdecea',
                  color: '#d32f2f',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              >
                {error}
              </div>
            )
          }

          {
            success && (
              <div
                style={{
                  backgroundColor:
                    '#e8f5e9',
                  color: '#2e7d32',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              >
                {success}
              </div>
            )
          }

          <div
            style={{
              marginBottom: '20px'
            }}
          >
            <label
              style={{
                fontWeight: 600
              }}
            >
              Leave Type *
            </label>

            <br />

            <select
              value={leaveType}
              onChange={(e) =>
                setLeaveType(
                  e.target.value
                )
              }
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '6px',
                borderRadius: '8px'
              }}
            >
              <option>
                Vacation
              </option>

              <option>
                Casual Leave
              </option>

              <option>
                Sick Leave
              </option>

              <option>
                Optional Holiday
              </option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                flex: 1
              }}
            >
              <label
                style={{
                  fontWeight: 600
                }}
              >
                Start Date *
              </label>

              <br />

              <input
                type="date"
                value={startDate}
                min={
                  new Date()
                    .toISOString()
                    .split('T')[0]
                }
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '6px',
                  borderRadius: '8px'
                }}
              />
            </div>

            <div
              style={{
                flex: 1
              }}
            >
              <label
                style={{
                  fontWeight: 600
                }}
              >
                End Date *
              </label>

              <br />

              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '6px',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                fontWeight: 600
              }}
            >
              Comments
            </label>

            <br />

            <textarea
              rows={5}
              value={comments}
              onChange={(e) =>
                setComments(
                  e.target.value
                )
              }
              style={{
                width: '100%',
                marginTop: '6px',
                borderRadius: '8px',
                padding: '10px'
              }}
            />
          </div>

        </div>

        <div
          style={{
            padding: '20px',
            borderTop:
              '1px solid #eee',
            textAlign: 'right'
          }}
        >
          <button
            onClick={() => {
              handleSubmit().catch(
                console.error
              );
            }}
            style={{
              backgroundColor:
                '#0078d4',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding:
                '12px 24px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            SUBMIT FOR APPROVAL
          </button>

          <button
            onClick={onClose}
            style={{
              marginLeft: '10px',
              backgroundColor:
                '#f3f2f1',
              border:
                '1px solid #ddd',
              borderRadius: '8px',
              padding:
                '12px 24px',
              cursor: 'pointer'
            }}
          >
            CANCEL
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplyLeave;