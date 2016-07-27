import { Calendar } from 'calendar'
import './style.scss'


export class PrettyCal {
	constructor(idSelector) {
		this.cal = new Calendar();
		this.table = d3.select(`#${idSelector}`);
		this.currentDate = new Date();
		this.currentWeeks = this.cal.monthDays(this.currentDate.getFullYear(), this.currentDate.getDay(0));
		this.renderCal(this.currentWeeks)
	}

	renderCal(weeks) {
		weeks.forEach((week) => {
			this.table.append('tr')
				 .selectAll('td')
				 .data(week)
				 .enter()
				 .append('td')
				 .attr('class', (d) => {
				 	return d > 0 ? '' : 'empty';
				 })
				 .text((d) => {
				 	return d > 0 ? d : '';
				 })
		});
	}
}