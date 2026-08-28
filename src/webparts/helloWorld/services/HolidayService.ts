import { spfi, SPFx } from '@pnp/sp';

import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export default class HolidayService {

  public static async getHolidays(
    context: any
  ): Promise<any[]> {

    const sp = spfi().using(
      SPFx(context)
    );

    const items = await sp.web.lists
      .getByTitle('Company Holidays')
      .items
      .select(
        'Id',
        'Title',
        'HolidayDate',
        'Category',
        'Description'
      )();

    return items;
  }
}