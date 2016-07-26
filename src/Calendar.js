import { Calendar } from 'calendar'

export const Cal = new Calendar();

Cal.monthDays(2014, 11).forEach((week) => {
	console.log(week)
});