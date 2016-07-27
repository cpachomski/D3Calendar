import { Calendar } from 'calendar'
import Constants from './Constants.js'
console.log(Constants)
import './style.scss'


export class PrettyCal {

	constructor(idSelector) {
		this.cal = new Calendar();
		this.table = d3.select(`#${idSelector}`);
		this.setCurrentDate();
		this.generateWeeks();

		//this.currentWeeks is set in generateWeeks()
		this.renderCal(this.currentWeeks)
		this.addHandlers();
	}

	addHandlers() {
		const prev = document.getElementById('prev-month');
		const next = document.getElementById('next-month');

		prev.addEventListener('click', (e) => {
			this.prevMonth();
			this.generateWeeks();
			this.renderCal();

		});

		next.addEventListener('click', (e) => {
			this.nextMonth();
			this.generateWeeks();
			this.renderCal();
		});
	}

	setCurrentDate() {
		this.currentDate = new Date();
		this.date = this.currentDate.getDate();
		this.month = this.currentDate.getMonth();
		this.year = this.currentDate.getFullYear();
	}

	prevMonth() {
		if (this.month === 0) {
			this.month = 11;
			this.year -= 1;
		} else {
			this.month -= 1;
		}
	}

	nextMonth() {
		if (this.month === 11 ) {
			this.month = 0;
			this.year += 1;
		} else {
			this.month += 1;
		}
	}

	generateWeeks() {
		this.currentWeeks = this.cal.monthDays(this.year, this.month);
	}

	removeCal() {
		d3.selectAll('thead').remove();
		d3.selectAll('tbody').remove();
	}

	renderCal() {
		this.removeCal();

		this.tableHeader = this.table.append('thead');
		this.tableBody = this.table.append('tbody');

		//Add month
		this.tableHeader.append('tr')
						.append('td')
						.attr('colspan', 4)
						.text(Constants.monthNames[this.month])

		//Add year
		this.tableHeader.select('table thead tr')
						.append('td')
						.attr('colspan', 3)
						.text(this.year)


		//Add Days of the week
		this.tableHeader.append('tr')
						.selectAll('td')
						.data(Constants.dayNames)
						.enter()
						.append('td')
						.text((d) => d.split('').splice(0,2).join(''));

		//Add numerical cell for each day of the month
		this.currentWeeks.forEach((week) => {
			this.tableBody.append('tr')
				 .selectAll('td')
				 .data(week)
				 .enter()
				 .append('td')
				 .attr('class', (d) => {
				 	if (d <= 0) {
				 		return 'empty'
				 	} else if  (d === this.date &&
				 				this.month === this.currentDate.getMonth() &&
				 				this.year === this.currentDate.getFullYear()) {
				 		return 'current-date'
				 	} else {
				 		return ''
				 	}
				 })
				 .text((d) => {
				 	return d > 0 ? d : '';
				 });
		});
	}
}