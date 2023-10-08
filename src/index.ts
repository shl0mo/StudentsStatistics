const obj_globals = {
	current_student_position: 0
}

class Student {
	private id : number = 0
	private name : string = ''
	private age : number = 0
	private height : number = 0
	private weight : number = 0

	constructor (id : number, name : string, age : number, height : number, weight : number) {
		this.setId(id)
		this.setName(name)
		this.setAge(age)
		this.setHeight(height)
		this.setWeight(weight)

	}

	public setId (id : number) {
		this.id = id
	}

	public setName (name : string) : void {
		this.name = name
	}

	public setAge (age : number) : void {
		this.age = age
	}

	public setHeight (height : number) : void {
		this.height = height
	}

	public setWeight (weight : number) : void {
		this.weight = weight
	}

	public getId () : number {
		return this.id
	}

	public getAge() : number {
		return this.age
	}

	public getName () : string {
		return this.name
	}

	public getHeight () : number {
		return this.height
	}

	public getWeight () : number {
		return this.weight
	}

	public duplicatedStudent (another_student : Student) : boolean {
		const sameName : boolean = another_student.getName() === this.getName()
		const sameAge : boolean = another_student.getAge() === this.getAge()
		const sameHeight : boolean = another_student.getHeight() === this.getHeight()
		const sameWeight : boolean = another_student.getWeight() === this.getWeight()
		if (sameName && sameAge && sameHeight && sameWeight) return true
		else return false
	}
}

class Class {
	private id : number = 0
	private name : string = ''
	private students : Student[] = []
	private last_student_id_reference : number = 1
	
	constructor (id : number, name : string, students : Student[]) {
		this.setId(id)
		this.setName(name)
		this.setStudents(students)
	}

	public setId (id : number) : void {
		this.id = id
	}

	public setName (name : string) : void {
		this.name = name
	}

	public setStudents (students : Student[]) : void {
		this.students = students
	}

	public getStudents () {
		return this.students
	}

	public getNumStudents () : number {
		return this.getStudents().length
	}

	public getAgesMean () : number {
		const students : Student[] = this.getStudents()
		const ages_sum : number = students.reduce((sum, student) => sum + student.getAge(), 0)
		const ages_mean : number = ages_sum/this.getNumStudents()
		return ages_mean
	}

	public getHeightsMean () : number {
		const students : Student[] = this.getStudents()
		const heights_sum : number = students.reduce((sum, student) => sum + student.getHeight(), 0)
		const heights_mean : number = heights_sum/this.getNumStudents()
		return heights_mean
	}

	public getWeightsMean () : number {
		const students : Student[] = this.getStudents()
		const weights_sum : number = students.reduce((sum, student) => sum + student.getWeight(), 0)
		const weights_mean : number = weights_sum/this.getNumStudents()
		return weights_mean
	}

	public newStudentCreated () : void {
		this.last_student_id_reference++
	}

	public getLastStudentIdReference () : number {
		return this.last_student_id_reference
	}
}

function enableEditingStudent () {
	const currentNode = this
	const students = _class.getStudents()
	const card = currentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
	const cards_collection = document.getElementsByClassName('row w-75 mb-1')
	let student_position = 0
	for (let i = 0; i < cards_collection.length; i++) {
		if (cards_collection[i] === card) student_position = i
	}
	obj_globals.current_student_position = student_position
	const reference_id : number = students[student_position].getId()
	const input_name : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-name-edit-${reference_id}`))
	const input_age : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-age-edit-${reference_id}`))
	const input_height : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-height-edit-${reference_id}`))
	const input_weight : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-weight-edit-${reference_id}`))
	const save_updates_button : HTMLElement = (<HTMLElement>document.querySelector(`#save-updates-button-${reference_id}`))
	const inputs : HTMLInputElement[] = []
	inputs.push(input_name)
	inputs.push(input_age)
	inputs.push(input_height)
	inputs.push(input_weight)
	for (const input of inputs) {
		input.readOnly = false
		input.classList.add('bg-light')
		input.classList.replace('border-0', 'border-1')
		input.classList.add('rounded')
		input.classList.add('p-1')
	}
	save_updates_button.classList.replace('d-none', 'd-block')
}

function deleteStudent () {
	const currentNode = this
	const card = currentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
	const cards_collection = document.getElementsByClassName('row w-75 mb-1')
	let student_position = 0
	for (let i = 0; i < cards_collection.length; i++) {
		if (cards_collection[i] === card) student_position = i
	}
	document.querySelector('#students-info-container')?.children[student_position].remove()
	_class.getStudents().splice(student_position, 1)
	updateStatistics(/*_class*/)
}

const students : Student[] = []
const _class : Class = new Class(1, 'Physical Education Class', students)

const updateStatistics = (/*_class : Class*/) => {
	const ages_mean_input : HTMLInputElement = (<HTMLInputElement>document.querySelector('#input-ages-mean'))
	const heights_mean_input : HTMLInputElement = (<HTMLInputElement>document.querySelector('#input-heights-mean'))
	const weights_mean_input : HTMLInputElement = (<HTMLInputElement>document.querySelector('#input-weights-mean'))
	ages_mean_input.value = String(_class.getAgesMean())
	heights_mean_input.value = String(_class.getHeightsMean())
	weights_mean_input.value = String(_class.getWeightsMean())
}

const saveUpdates = () => {
	const students = _class.getStudents()
	const student_position = obj_globals.current_student_position
	const reference_id = students[obj_globals.current_student_position].getId()
	const input_name : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-name-edit-${reference_id}`))
	const input_age : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-age-edit-${reference_id}`))
	const input_height : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-height-edit-${reference_id}`))
	const input_weight : HTMLInputElement = (<HTMLInputElement>document.querySelector(`#input-weight-edit-${reference_id}`))
	const save_updates_button : HTMLElement = (<HTMLElement>document.querySelector(`#save-updates-button-${reference_id}`))
	const input_name_value : string = input_name.value
	const input_age_value : number = parseInt(input_age.value)
	const input_height_value : number = parseFloat(input_height.value)
	const input_weight_value : number = parseFloat(input_weight.value)
	students[student_position].setName(input_name_value)
	students[student_position].setAge(input_age_value)
	students[student_position].setHeight(input_height_value)
	students[student_position].setWeight(input_weight_value)
	const inputs : HTMLInputElement[] = []
	inputs.push(input_name)
	inputs.push(input_age)
	inputs.push(input_height)
	inputs.push(input_weight)
	for (const input of inputs) {
		input.readOnly = true
		input.classList.remove('bg-light')
		input.classList.replace('border-1', 'border-0')
		input.classList.remove('rounded')
		input.classList.remove('p-1')
	}
	save_updates_button.classList.replace('d-block', 'd-none')
	updateStatistics()
	console.log(_class.getStudents())
}

const addNewStudent = (_class : Class) => {
	const id = _class.getLastStudentIdReference()
	let name : string = (<HTMLInputElement>document.querySelector('#input-name')).value
	const surname : string = (<HTMLInputElement>document.querySelector('#input-surname')).value
	const age_string : string = (<HTMLInputElement>document.querySelector('#input-age')).value
	const height_string : string = (<HTMLInputElement>document.querySelector('#input-height')).value
	const weight_string : string = (<HTMLInputElement>document.querySelector('#input-weight')).value
	if (name === '' || surname === '' ||  age_string == '' || height_string == '' || weight_string == '') {
		alert('Preencha todos os campos')
		return
	}
	const age : number = parseInt((<HTMLInputElement>document.querySelector('#input-age')).value)
	const height : number = parseFloat((<HTMLInputElement>document.querySelector('#input-height')).value)
	const weight : number = parseFloat((<HTMLInputElement>document.querySelector('#input-weight')).value)
	name = `${name} ${surname}`
	const new_student = new Student(id, name, age, height, weight)
	const students = _class.getStudents()
	for (const student of students) {
		if (new_student.duplicatedStudent(student)) {
			alert('Não é possível adicionar estudantes duplicados (com os mesmos nome, idade, altura e peso)')
			return
		}
	}
	students.push(new_student)
	const students_info_container : HTMLElement = (<HTMLElement>document.querySelector('#students-info-container'))
	const reference_id = _class.getLastStudentIdReference()
	let card_element_string : string = `
		<div class="row w-75 mb-1">
			<div class="card position-relative shadow p-1">
				<div class="card-body">
					<div class="d-flex flex-row justify-content-between m-0">
						<h6 class="card-title mb-3">${id}.<input type="text" id="input-name-edit-${reference_id}" class="info-input border-0" value="${name}" readonly></h6>
								<div class="d-flex flex-row w-25 justify-content-around">
								<div>
									<button type="button" class="btn p-0 pb-2 edit-button-card"><i class="bi bi-pencil-square"></i></button>
								</div>
								<div>
									<button type="button" class="btn-close close-button-card" aria-label="Fechar"></button>
								</div>
							</div>
						</div>
						<hr class="mt-1">
						<p><div class="mb-1">
							idade: <input type="number" id="input-age-edit-${reference_id}" class="info-input border-0" value="${age}" readonly><br>
							altura: <input type="number"id="input-height-edit-${reference_id}" class="info-input border-0" value="${height}" readonly><br>
							peso: <input id="input-weight-edit-${reference_id}" type="number" class="info-input border-0" value="${weight}" readonly>
						</div></p>
						<buttom id="save-updates-button-${reference_id}" class="save-updates-button btn btn-primary d-none">Salvar</button>
					</div>

				</div>
			</div>
		</div>
	`
	card_element_string = card_element_string.trim()
	students_info_container.innerHTML = students_info_container.innerHTML + card_element_string
	const close_buttons : NodeListOf<HTMLElement> = document.querySelectorAll('.close-button-card')
	const edit_buttons : NodeListOf<HTMLElement> = document.querySelectorAll('.edit-button-card')
	const save_updates_buttons : NodeListOf<HTMLElement> = document.querySelectorAll('.save-updates-button')
	for (let i = 0; i < close_buttons.length; i++) {
		close_buttons[i].addEventListener('click', deleteStudent, false)
		edit_buttons[i].addEventListener('click', enableEditingStudent, false)
		save_updates_buttons[i].addEventListener('click', saveUpdates, false)
	}
	updateStatistics(/*_class*/)
	_class.newStudentCreated()
}

const interval = setInterval(() => {
	const button_add_new_student : HTMLElement | null = document.querySelector('#button-add-new-student')
	if (document.contains(button_add_new_student)) {
		button_add_new_student?.addEventListener('click', () => { addNewStudent(_class) })
		clearInterval(interval)
	}
}, 500)


