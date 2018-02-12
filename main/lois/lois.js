var io = io || {};
io.github = io.github || {};
io.github.shunshun94 = io.github.shunshun94 || {};
io.github.shunshun94.HiyokoCross = io.github.shunshun94.HiyokoCross || {};
io.github.shunshun94.HiyokoCross.Lois = class extends com.hiyoko.component.ApplicationBase  {
	constructor($html, sheet) {
		super($html);
		this.sheet = sheet;
		if(! Boolean(this.sheet)) {
			throw 'io.github.shunshun94.HiyokoCross.Lois Requires TWO arguments.' + 
			'1st, base element. 2nd, character sheet data.';
		}
		this.$html.empty();
		this.$html.append(`<button id="${this.id}-shareLoises">ロイスの状態を共有する</button>`);
		this.eventBind();
		this.buildComponents();
	}
	
	updateInitiativeTable() {
		const data = this.getData();
		this.fireEvent({
			type: 'tofRoomRequest',
			method: 'updateCharacter',
			args: [{
				targetName: this.sheet.name,
				'ロイス': data.lois.filter((lois) => {
					return !(lois.titus || lois.type === 'Dロイス');
				}).length
			}]
		});
	}

	getData() {
		var result = {};
		result.lois = this.table.getTableValue().map((lois) => {
			return {
				name: lois[0],
				type: lois[1] ? 'Dロイス' : '',
				Pfeel: lois[2],
				Nfeel: lois[3],
				isSLois: lois[4],
				titus: lois[5],
				used: lois[6]
			}
		});
		return result;
	}

	buildComponents() {
		this.$html.append(`<table border="1" id="${this.id}-loises">` + '</table>');
		const $loises = this.getElementById('loises');
		this.table = new io.github.shunshun94.HiyokoCross.LoisList($loises);
	}
	
	eventBind() {
		this.getElementById('shareLoises').click((e) => {
			const loises = this.getData().lois;
			const dLois = loises.filter((lois) => {
				return lois.type === 'Dロイス';
			}).map((lois) => {return lois.name});
			const titus = loises.filter((lois) => {
				return lois.titus;
			}).map((lois) => {
				if(lois.used) {
					return lois.name + ' (昇華済)';
				} else {
					return lois.name;
				}
			});
			const normalLois = loises.filter((lois) => {
				return (! Boolean(lois.titus)) && lois.type !== 'Dロイス'
			}).map((lois) => {  
				if(lois.isSLois) {
					return lois.name + ' (Sロイス)';
				} else {
					return lois.name;
				}
			});
			
			var message = '';
			if(dLois.length) {
				message += 'Dロイス\n' + dLois.join('\n') + '\n\n';
			}
			if(normalLois.length) {
				message += `ロイス\n` + normalLois.join('\n') + '\n\n';
			}
			if(titus.length) {
				message += 'タイタス\n' + titus.join('\n') + '\n\n';
			}
			if(7 - loises.length) {
				message += `空スロット ${7 - loises.length}つ`
			}
			
			
			this.fireEvent({
				type: 'tofRoomRequest',
				method: 'sendChat',
				args: [{
					name: this.sheet.name,
					message: message
				}]
			});
		});
		
		this.$html.on(io.github.shunshun94.HiyokoCross.LoisList.EVENTS.SEND_MESSAGE, (e) => {
			e.name = this.sheet.name;
			this.fireEvent({
				type: 'tofRoomRequest',
				method: 'sendChat',
				args: [e]
			});
		});

		this.$html.on(io.github.shunshun94.HiyokoCross.LoisList.EVENTS.UPDATE_REQUEST, (e) => {
			this.updateInitiativeTable(e);
		});
		
		this.$html.on('getStorage', (e) => {
			const list = this.sheet.lois.map((lois) => {
				return [lois.name, (lois.type === 'Dロイス'), lois.Pfeel, lois.Nfeel, lois.isSLois, lois.titus, lois.used]
			});
			e.callback(list);
		});
	}
};