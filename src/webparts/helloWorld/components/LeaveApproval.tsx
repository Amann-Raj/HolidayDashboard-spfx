import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import LeaveService from '../services/LeaveService';
import { ILeaveRequest } from '../models/ILeaveRequest';
import HRKPIs from './HRKPIs';

interface ILeaveApprovalProps {
  context: WebPartContext;
}

const LeaveApproval: React.FC<ILeaveApprovalProps> = ({
  context
}) => {

  const [leaves, setLeaves] =
    React.useState<ILeaveRequest[]>([]);

  const loadLeaves = async (): Promise<void> => {

    try {

      const data =
        await LeaveService.getLeaveRequests(
          context
        );

      setLeaves(
        data as ILeaveRequest[]
      );

    } catch (error) {

      console.error(
        'Leave Approval Error:',
        error
      );

    }

  };

  React.useEffect(() => {

    loadLeaves().catch(
      console.error
    );

  }, []);

  const handleApprove = async (
    id: number
  ): Promise<void> => {

    await LeaveService.approveLeave(
      context,
      id
    );

    await loadLeaves();

  };

  const handleReject = async (
    id: number
  ): Promise<void> => {

    await LeaveService.rejectLeave(
      context,
      id
    );

    await loadLeaves();

  };

  const pendingLeaves =
    leaves.filter(
      leave =>
        leave.field_5 === 'Pending'
    );

  const approvedLeaves =
    leaves.filter(
      leave =>
        leave.field_5 === 'Approved'
    );

  const rejectedLeaves =
    leaves.filter(
      leave =>
        leave.field_5 === 'Rejected'
    );

  const renderLeaveCard = (
    leave: ILeaveRequest
  ): JSX.Element => {

    const startDate =
      new Date(
        leave.field_2
      ).toLocaleDateString(
        'en-IN'
      );

    const endDate =
      new Date(
        leave.field_3
      ).toLocaleDateString(
        'en-IN'
      );

    const duration =
      Math.ceil(
        (
          new Date(
            leave.field_3
          ).getTime() -
          new Date(
            leave.field_2
          ).getTime()
        ) /
        (
          1000 *
          60 *
          60 *
          24
        )
      ) + 1;

    return (
      <div
        key={leave.Id}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '12px',
          boxShadow:
            '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems:
            'flex-start'
        }}
      >

        <div
          style={{
            maxWidth: '75%'
          }}
        >
          <h4
            style={{
              margin: 0,
              marginBottom: '10px'
            }}
          >
            {leave.Title}
          </h4>

          <div
            style={{
              marginBottom: '6px',
              color: '#555'
            }}
          >
            <strong>
              Leave Type:
            </strong>{' '}
            {leave.field_4}
          </div>

          <div
            style={{
              marginBottom: '6px',
              color: '#555'
            }}
          >
            <strong>
              From:
            </strong>{' '}
            {startDate}
          </div>

          <div
            style={{
              marginBottom: '6px',
              color: '#555'
            }}
          >
            <strong>
              To:
            </strong>{' '}
            {endDate}
          </div>

          <div
            style={{
              marginBottom: '10px',
              color: '#555'
            }}
          >
            <strong>
              Duration:
            </strong>{' '}
            {duration} Day(s)
          </div>

          <div
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: '#323130',
                minWidth: '70px'
              }}
            >
              Reason :
            </span>

            <span
              style={{
                backgroundColor: '#F3F4F6',
                padding: '8px 14px',
                borderRadius: '999px',
                color: '#444',
                fontSize: '14px',
                border: '1px solid #E5E7EB'
              }}
            >
              {
                (leave as any).Comments ||
                'No reason provided.'
              }
            </span>
          </div>

        </div>

        {
          leave.field_5 === 'Pending'
            ? (
              <div>

                <button
                  onClick={() => {
                    handleApprove(
                      leave.Id
                    ).catch(
                      console.error
                    );
                  }}
                  style={{
                    backgroundColor:
                      '#2ecc71',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding:
                      '10px 18px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => {
                    handleReject(
                      leave.Id
                    ).catch(
                      console.error
                    );
                  }}
                  style={{
                    backgroundColor:
                      '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding:
                      '10px 18px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Reject
                </button>

              </div>
            )
            : (
              <span
                style={{
                  backgroundColor:
                    leave.field_5 ===
                      'Approved'
                      ? '#2ecc71'
                      : '#e74c3c',

                  color: '#fff',

                  padding:
                    '10px 20px',

                  borderRadius:
                    '25px',

                  fontWeight: 600,

                  minWidth:
                    '120px',

                  textAlign:
                    'center'
                }}
              >
                {leave.field_5}
              </span>
            )
        }

      </div>
    );

  };

  return (
    <div>

      <HRKPIs
        pending={
          pendingLeaves.length
        }
        approved={
          approvedLeaves.length
        }
        rejected={
          rejectedLeaves.length
        }
      />

      <h3>
        Pending Approvals
      </h3>

      {
        pendingLeaves.length === 0
          ? (
            <p>
              No pending approvals.
            </p>
          )
          : (
            pendingLeaves.map(
              renderLeaveCard
            )
          )
      }

      <h3
        style={{
          marginTop: '30px'
        }}
      >
        Approved Requests
      </h3>

      {
        approvedLeaves.length === 0
          ? (
            <p>
              No approved requests.
            </p>
          )
          : (
            approvedLeaves.map(
              renderLeaveCard
            )
          )
      }

      <h3
        style={{
          marginTop: '30px'
        }}
      >
        Rejected Requests
      </h3>

      {
        rejectedLeaves.length === 0
          ? (
            <p>
              No rejected requests.
            </p>
          )
          : (
            rejectedLeaves.map(
              renderLeaveCard
            )
          )
      }

    </div>
  );

};

export default LeaveApproval;