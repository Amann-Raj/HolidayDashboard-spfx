import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import LeaveApproval from './LeaveApproval';

interface IHRViewProps {
  context: WebPartContext;
}

const HRView: React.FC<IHRViewProps> = ({
  context
}) => {

  return (
    <div
      style={{
        marginTop: '20px'
      }}
    >
      <h2>
        HR Dashboard
      </h2>

      <LeaveApproval
        context={context}
      />
    </div>
  );

};

export default HRView;