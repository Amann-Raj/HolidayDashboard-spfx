import { spfi, SPFx } from '@pnp/sp';

import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export default class LeaveService {

  public static async getLeaveRequests(
    context: any
  ): Promise<any[]> {

    const sp = spfi().using(
      SPFx(context)
    );

    return await sp.web.lists
      .getByTitle('LeaveRequests')
      .items();

  }

  public static async getMyLeaves(
    context: any
  ): Promise<any[]> {

    const sp = spfi().using(
      SPFx(context)
    );

    const userEmail =
      context.pageContext.user.email;

    return await sp.web.lists
      .getByTitle('LeaveRequests')
      .items
      .filter(
        `field_1 eq '${userEmail}'`
      )();

  }

  public static async applyLeave(
    context: any,
    leaveData: any
  ): Promise<void> {

    const sp = spfi().using(
      SPFx(context)
    );

    await sp.web.lists
      .getByTitle('LeaveRequests')
      .items
      .add({
        Title: leaveData.employeeName,
        field_1: leaveData.email,
        field_2: leaveData.startDate,
        field_3: leaveData.endDate,
        field_4: leaveData.leaveType,
        field_5: 'Pending',
        field_6: leaveData.department,
        Comments: leaveData.comments
      });

  }

  public static async approveLeave(
    context: any,
    id: number
  ): Promise<void> {

    const sp = spfi().using(
      SPFx(context)
    );

    await sp.web.lists
      .getByTitle('LeaveRequests')
      .items
      .getById(id)
      .update({
        field_5: 'Approved'
      });

  }

  public static async rejectLeave(
    context: any,
    id: number
  ): Promise<void> {

    const sp = spfi().using(
      SPFx(context)
    );

    await sp.web.lists
      .getByTitle('LeaveRequests')
      .items
      .getById(id)
      .update({
        field_5: 'Rejected'
      });

  }
}