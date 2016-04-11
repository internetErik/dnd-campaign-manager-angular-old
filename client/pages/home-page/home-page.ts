import 'reflect-metadata';
import {Component} from 'angular2/core';

@Component({
	selector: 'home-page',
	template: `
<h1>D&amp;D Campaign Manager</h1>
<hr>
<section class="p20-0 m20-0">
	<a href="https://docs.google.com/document/d/1fhU4Yi9iTAPeSsHforCmueETGnhwSMLu3P_VXZPjkkY/edit?usp=sharing" target="_blank">D&amp;D Mechanics (Google Doc)</a>
</section>
	`
})
export class HomePage {}