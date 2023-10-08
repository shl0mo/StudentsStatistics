/*type Student = {
	id : number
	name : string
	age : number
	height : number
	weight : number
}

type Class = {
	id : number
	name : string
	students : Student[]
}*/

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


const students : Student[] = []
const _class : Class = new Class(1, 'Physical Education Class', students)


const addNewStudent = (_class : Class) => {
	const id = _class.getLastStudentIdReference()
	_class.newStudentCreated()
	const name : string = (<HTMLInputElement>document.querySelector('#input-name')).value
	const age_string : string = (<HTMLInputElement>document.querySelector('#input-age')).value
	const height_string : string = (<HTMLInputElement>document.querySelector('#input-height')).value
	const weight_string : string = (<HTMLInputElement>document.querySelector('#input-weight')).value
	if (name === '' || age_string == '' || height_string == '' || weight_string == '') {
		alert('Preencha todos os campos')
		return
	}
	const age : number = parseInt((<HTMLInputElement>document.querySelector('#input-age')).value)
	const height : number = parseFloat((<HTMLInputElement>document.querySelector('#input-height')).value)
	const weight : number = parseFloat((<HTMLInputElement>document.querySelector('#input-weight')).value)
	const new_student = new Student(id, name, age, height, weight)
	const students = _class.getStudents()
	students.push(new_student)
	/*Next:
	 * Create new student element and append it to the students container
	 */
}

const interval = setInterval(() => {
	const button_add_new_student : HTMLElement | null = document.querySelector('#button-add-new-student')
	if (document.contains(button_add_new_student)) {
		button_add_new_student?.addEventListener('click', () => { addNewStudent(_class) })
		clearInterval(interval)
	}
}, 500)


