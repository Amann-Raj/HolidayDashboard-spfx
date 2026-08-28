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

    return (
      <div
        key={leave.Id}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '12px',
          boxShadow:
            '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h4
            style={{
              margin: 0
            }}
          >
            {leave.Title}
          </h4>

          <div
            style={{
              color: '#666',
              marginTop: '5px'
            }}
          >
            {leave.field_4}
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
                    leave.field_5 === 'Approved'
                      ? '#2ecc71'
                      : '#e74c3c',

                  color: '#fff',
                  padding:
                    '10px 20px',
                  borderRadius: '25px',
                  fontWeight: 600,
                  minWidth: '110px',
                  textAlign: 'center'
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
        pending={pendingLeaves.length}
        approved={approvedLeaves.length}
        rejected={rejectedLeaves.length}
      />

      <h3>Pending Approvals</h3>

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