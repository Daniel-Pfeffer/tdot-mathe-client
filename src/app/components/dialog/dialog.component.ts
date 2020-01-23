import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import Calories from '../../../assets/calories.json';
import {Calories as Cal, Gain} from '../../data/Calories';
import {DataService} from '../../services/data.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	TREE_DATA: Array<CaloriesNode> = [];
	treeControl: FlatTreeControl<FlatNode>;
	treeFlattener: MatTreeFlattener<CaloriesNode, any>;
	dataSource: MatTreeFlatDataSource<CaloriesNode, any>;
	calories: Cal;

	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dataService: DataService
	) {
		this.treeControl = new FlatTreeControl<FlatNode>(
			node => node.level,
			node => node.expandable
		);
		this.treeFlattener = new MatTreeFlattener(
			this.transformer,
			node => node.level,
			node => node.expandable,
			node => node.children
		);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
		this.calories = Calories;
		let insKcal = 0;
		let insG = 0;
		dataService.config.types.forEach(value => {
			const gain = this.findCorrectCalories(value.shortName);
			const amountG = data[value.shortName];
			const kcal = (amountG / gain.count) * gain.kcal;
			insKcal += +kcal;
			insG += +amountG;
			let children: Array<CaloriesNode> = [];
			this.calories.burn.forEach(value1 => {
				const {name, shortName} = value;
				const {distance, activity, time, isCar} = value1;
				if (distance) {
					children.push(
						new CaloriesNode(
							activity,
							[
								new CaloriesNode(
									`Um ${this.gConvert(data[shortName])} an ${name.replace(' [g]', '')} zu verbrennen, ${isCar ? 'könnte' : 'müsste'} man ${this.toSecondPrecision((kcal / 100) * distance)}km ${isCar ? ' mit dem Auto fahren' : activity.toLowerCase()}`
								)
							]
						)
					);
				} else if (time) {
					children.push(
						new CaloriesNode(
							activity,
							[
								new CaloriesNode(
									`Um ${this.gConvert(data[shortName])} an ${name.replace(' [g]', '')} zu verbrennen, müsste man ${this.timeConvert((kcal / 100) * time)} ${activity}`
								)
							]
						)
					);
				}
			});
			this.TREE_DATA.push({name: value.name, children});
		});

		this.TREE_DATA.push({name: 'Insgesamt', children: this.calculateAll(insKcal, insG)});
		this.dataSource.data = this.TREE_DATA;
	}

	private transformer(node: CaloriesNode, level: number) {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level,
		};
	}

	private toSecondPrecision(num: number): number {
		return Math.floor(num * 100) / 100;
	}

	private findCorrectCalories(shortName: string): Gain {
		return this.calories.gain.find(value => value.name === shortName);
	}

	private timeConvert(n) {
		const num = n;
		const hours = (num / 60);
		const rhours = Math.floor(hours);
		const minutes = (hours - rhours) * 60;
		const rminutes = Math.round(minutes);
		return `
		${rhours > 0 ? `
			${rhours} Stunde${rhours > 1 ? 'n' : ''}` : ''}${rminutes > 0 ? `${rhours === 0 || rminutes === 0 ? '' : ' und '}${rminutes} Minute${rminutes > 1 ? 'n' : ''}` : ''}`;
	}

	private gConvert(num: number) {
		let kg = num / 1000;
		const g = Math.round((kg - Math.floor(kg)) * 1000);
		kg = Math.floor(kg);
		return `${kg > 0 ? `${kg}kg ` : ''}${kg === 0 || g === 0 ? '' : 'und'} ${g > 0 ? `${g}g ` : ''}`;
	}

	hasChild = (_: number, node: FlatNode) => node.expandable;

	private calculateAll(cal: number, g: number): Array<CaloriesNode> {
		let children: Array<CaloriesNode> = [];
		this.calories.burn.forEach(value1 => {
			const {distance, activity, time, isCar} = value1;
			if (distance) {
				children.push(
					new CaloriesNode(
						activity,
						[
							new CaloriesNode(
								`Um insgesamt ${this.gConvert(g)} an Süßigkeiten zu verbrennen, ${isCar ? 'könnte' : 'müsste'} man ${this.toSecondPrecision((cal / 100) * distance)}km ${isCar ? ' mit dem Auto fahren' : activity.toLowerCase()}`
							)
						]
					)
				);
			} else if (time) {
				children.push(
					new CaloriesNode(
						activity,
						[
							new CaloriesNode(
								`Um insgesamt ${this.gConvert(g)}g an Süßigkeiten zu verbrennen, müsste man ${this.timeConvert((cal / 100) * time)} ${activity}`
							)
						]
					)
				);
			}
		});
		return children;
	}
}

class CaloriesNode {
	name: string;
	children?: Array<CaloriesNode>;

	constructor(name: string, children?: Array<CaloriesNode>) {
		this.name = name;
		this.children = children;
	}
}

interface FlatNode {
	expandable: boolean;
	name: string;
	level: number;
}
