import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import LeaveService from '../services/LeaveService';
import { ILeaveRequest } from '../models/ILeaveRequest';

import LeaveCard from './LeaveCard';
import HRKPIs from './HRKPIs';

interface ILeaveRequestsProps {
  context: WebPartContext;
}

const LeaveRequests: React.FC<ILeaveRequestsProps> = ({
  context
}) => {

  const [leaves, setLeaves] =
    React.useState<ILeaveRequest[]>([]);

  React.useEffect(() => {

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
          'Leave Error:',
          error
        );

      }

    };

    loadLeaves().catch(
      console.error
    );

  }, [context]);

  const pending =
    leaves.filter(
      leave =>
        leave.field_5 === 'Pending'
    ).length;

  const approved =
    leaves.filter(
      leave =>
        leave.field_5 === 'Approved'
    ).length;

  const rejected =
    leaves.filter(
      leave =>
        leave.field_5 === 'Rejected'
    ).length;

  return (
    <div
      style={{
        marginTop: '20px'
      }}
    >

      <h3>Leave Requests</h3>

      <HRKPIs
        pending={pending}
        approved={approved}
        rejected={rejected}
      />

      {
        leaves.length === 0 && (
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '12px',
              marginTop: '15px'
            }}
          >
            No leave requests found.
          </div>
        )
      }

      {
        leaves.map((leave) => (

          <LeaveCard
            key={leave.Id}
            employeeName={leave.Title}
            email={leave.field_1}
            startDate={leave.field_2}
            endDate={leave.field_3}
            leaveType={leave.field_4}
            status={leave.field_5}
            department={leave.field_6}
          />

        ))
      }

    </div>
  );

};

export default LeaveRequests;