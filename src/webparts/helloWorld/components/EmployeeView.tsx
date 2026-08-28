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

    const [searchText, setSearchText] =
        React.useState<string>('');

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

        loadHolidays().catch(console.error);

    }, [context]);

    const filteredHolidays =
        holidays.filter((holiday) => {

            const matchesCategory =
                selectedCategory === 'All' ||
                holiday.Category === selectedCategory;

            const matchesSearch =
                holiday.Title
                    .toLowerCase()
                    .indexOf(
                        searchText.toLowerCase()
                    ) !== -1;

            return (
                matchesCategory &&
                matchesSearch
            );

        });

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

    if (loading) {

        return (
            <h3>
                Loading holidays...
            </h3>
        );

    }

    return (
        <div style={{ marginTop: '20px' }}>

            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '25px'
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

            <Filters
                selectedCategory={selectedCategory}
                selectedView={selectedView}
                searchText={searchText}
                onCategoryChange={setSelectedCategory}
                onViewChange={setSelectedView}
                onSearchChange={setSearchText}
            />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        '1fr 2fr',
                    gap: '20px',
                    marginTop: '25px'
                }}
            >
                <LeaveBalance 
                context={context}
                />

                <MyLeaves
                    context={context}
                    refreshKey={refreshLeaves}
                />
            </div>

            <div style={{ marginTop: '25px' }}>

                {
                    selectedView === 'Card'
                        ? (
                            <UpcomingHolidays
                                holidays={filteredHolidays}
                                onBookTimeOff={() =>
                                    setShowLeaveModal(true)
                                }
                            />
                        )
                        : (
                            <CalendarView
                                holidays={filteredHolidays}
                            />
                        )
                }

            </div>

            <ApplyLeave
                context={context}
                isOpen={showLeaveModal}
                onClose={() =>
                    setShowLeaveModal(false)
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