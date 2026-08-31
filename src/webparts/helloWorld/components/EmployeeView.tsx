import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import KPISection from './KPISection';
import Filters from './Filters';
import CalendarView from './CalendarView';
import UpcomingHolidays from './UpcomingHolidays';
import MyLeaves from './MyLeaves';
import ApplyLeave from './ApplyLeave';
import LeaveBalance from './LeaveBalance';

import HolidayService from '../services/HolidayService';
import { IHoliday } from '../models/IHoliday';

interface IEmployeeViewProps {
  context: WebPartContext;
}

const EmployeeView: React.FC<IEmployeeViewProps> = ({
  context
}) => {

  const [selectedCategory, setSelectedCategory] =
    React.useState<string>('All');

  const [selectedView, setSelectedView] =
    React.useState<string>('Card');

  const [holidays, setHolidays] =
    React.useState<IHoliday[]>([]);

  const [loading, setLoading] =
    React.useState<boolean>(true);

  const [showLeaveModal, setShowLeaveModal] =
    React.useState<boolean>(false);

  const [refreshLeaves, setRefreshLeaves] =
    React.useState<number>(0);

  React.useEffect(() => {

    const loadHolidays = async (): Promise<void> => {

      try {

        const data =
          await HolidayService.getHolidays(
            context
          );

        setHolidays(
          data as IHoliday[]
        );

      } catch (error) {

        console.error(
          'Holiday Error:',
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadHolidays().catch(
      console.error
    );

  }, [context]);

  const filteredHolidays =
    holidays.filter(
      (holiday) => {

        const matchesCategory =
          selectedCategory === 'All' ||
          holiday.Category === selectedCategory;

        return matchesCategory;

      }
    );

  const today = new Date();

  const upcomingHolidaysCount =
    holidays.filter(
      holiday =>
        new Date(
          holiday.HolidayDate
        ) >= today
    ).length;

  const publicHolidays =
    holidays.filter(
      holiday =>
        holiday.Category ===
        'Public Holiday'
    ).length;

  const userName =
    context.pageContext.user.displayName;

  const userInitials =
    userName
      .split(' ')
      .map(
        (name) => name.charAt(0)
      )
      .slice(0, 2)
      .join('')
      .toUpperCase();

  if (loading) {

    return (
      <h3>
        Loading holidays...
      </h3>
    );

  }

  return (
    <div
      style={{
        marginTop: '20px'
      }}
    >

      {/* DASHBOARD HEADER */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: '#323130',
                fontWeight: 700
              }}
            >
              Holiday & Leave Dashboard
            </h2>

            <div
              style={{
                color: '#666',
                marginTop: '4px'
              }}
            >
              Welcome back, {userName} 👋
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: '999px',
              border: '1px solid #E5E7EB',
              boxShadow:
                '0 8px 20px rgba(37,99,235,0.12)'
            }}
          >
            <div
              title={userName}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#F8FAFF',
                border: '2px solid #2563EB',
                color: '#2563EB',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                fontWeight: 700,
                fontSize: '16px'
              }}
            >
              {userInitials}
            </div>

            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: '#323130'
                }}
              >
                {userName}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: '#666'
                }}
              >
                Employee
              </div>
            </div>
          </div>

        </div>

        {/* KPI CARDS */}

        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '30px'
          }}
        >
          <KPISection
            title="Total Holidays"
            value={holidays.length}
          />

          <KPISection
            title="Public Holidays"
            value={publicHolidays}
          />

          <KPISection
            title="Upcoming Holidays"
            value={upcomingHolidaysCount}
          />
        </div>

        {/* MY LEAVE REQUESTS */}

        <MyLeaves
          context={context}
          refreshKey={refreshLeaves}
          onBookTimeOff={() =>
            setShowLeaveModal(true)
          }
        />

        {/* MY LEAVE BALANCES */}

        <div
          style={{
            marginTop: '20px'
          }}
        >
          <LeaveBalance
            context={context}
          />
        </div>

        {/* FILTERS + VIEW TOGGLE */}

        <div
          style={{
            marginTop: '20px'
          }}
        >
          <Filters
            selectedCategory={
              selectedCategory
            }
            selectedView={
              selectedView
            }
            onCategoryChange={
              setSelectedCategory
            }
            onViewChange={
              setSelectedView
            }
          />
        </div>

        {/* HOLIDAY VIEW */}

        <div
          style={{
            marginTop: '20px'
          }}
        >
          {
            selectedView === 'Card'
              ? (
                <UpcomingHolidays
                  holidays={
                    filteredHolidays
                  }
                  onBookTimeOff={() =>
                    setShowLeaveModal(
                      true
                    )
                  }
                />
              )
              : (
                <CalendarView
                  holidays={
                    filteredHolidays
                  }
                />
              )
          }
        </div>

        {/* APPLY LEAVE MODAL */}

        <ApplyLeave
          context={context}
          isOpen={showLeaveModal}
          onClose={() =>
            setShowLeaveModal(
              false
            )
          }
          onLeaveApplied={() =>
            setRefreshLeaves(
              prev => prev + 1
            )
          }
        />

      </div>
      );

};

      export default EmployeeView;