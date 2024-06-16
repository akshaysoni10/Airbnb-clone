import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';

const DatePicker = ({ onSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
  
    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    };
  
    const prevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    };
  
    const onDateClick = (day) => {
      onSelectDate(day);
    };

    const renderHeader = () => {
        return (
          <div className="flex justify-between items-center">
            <button onClick={prevMonth}>{"<"}</button>
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={nextMonth}>{">"}</button>
          </div>
        );
      };
    
      const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(startOfMonth(currentMonth));
        const endDate = endOfWeek(endOfMonth(currentMonth));
    
        eachDayOfInterval({ start: startDate, end: endDate }).forEach(day => {
          days.push(
            <div
              key={day}
              className={`border p-2 ${isSameMonth(day, currentMonth) ? '' : 'text-gray-400'}`}
              onClick={() => onDateClick(day)}
            >
              {format(day, 'd')}
            </div>
          );
        });
    
        return <div className="grid grid-cols-7 gap-1">{days}</div>;
      };

  return (
    <div className="absolute bg-white border rounded-lg shadow-lg p-4 mt-2 z-50">
      {renderHeader()}
      {renderDays()}
    </div>
  )
}

export default DatePicker;
