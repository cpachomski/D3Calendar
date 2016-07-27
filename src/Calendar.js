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
		d3.selectAll('#calendar div').remove();
	}

	renderCal() {
		this.removeCal();

		//Add month
		this.table.append('div')
				  .attr('class', 'header')
				  .append('span')
				  .attr('class', 'month')
				  .text(Constants.monthNames[this.month])
				  .append('span')
				  .attr('class', 'year')
				  .text(this.year)


		//Add Days of the week
		this.table.append('div')
				.attr('class', 'weekdays')
				.append('ul')
				.selectAll('li')
				.data(Constants.dayNames)
				.enter()
				.append('li')
				.text((d) => d.split('').splice(0,2).join(''));

		//Add numerical cell for each day of the month
		this.currentWeeks.forEach((week, i) => {
			this.table.append('div')
				.attr('class', `week-${i + 1}`)
				 .selectAll('div')
				 .data(week)
				 .enter()
				 .append('div')
				 .attr('class', (d) => {
				 	if (d <= 0) {
				 		return 'empty day'
				 	} else if  (d === this.date &&
				 				this.month === this.currentDate.getMonth() &&
				 				this.year === this.currentDate.getFullYear()) {
				 		return 'current-date day'
				 	} else {
				 		return 'day'
				 	}
				 })
				 .text((d) => {
				 	return d > 0 ? d : '';
				 });
		});
	}
}