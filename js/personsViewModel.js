class PersonsViewModel {
	constructor() {
		this.scaleListing = 0.22;
		this.scalePortrait = 0.5;

		let person0 = this._emptyPerson();
		this.persons = ko.observableArray([]);
		this.selPerson = ko.observable(person0);
		
		let self = this;
		this._service = new PersonsService();
		this._service.get().then(res => {
			let list = JSON.parse(res.data);
			list.items.forEach(item => {item.selected = ko.observable(false);});
			self.persons(list.items);
		});
	}
	_emptyPerson() {
		return { 
			name: 'No Selection', 
			image: {src:'images/person_0.png',width:386,height:370}, 
			priorities:[], 
			challenges:[],
			selected: ko.observable(true)
		};
	}
	_onPersonClick(item) {
		if (theViewModel.selPerson()) {
			theViewModel.selPerson().selected(false);
		}
		item.selected(true);
		theViewModel.selPerson(item);
	}
}