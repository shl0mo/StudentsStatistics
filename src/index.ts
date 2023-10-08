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
	private id : number
	private name : string
	private age : number
	private height : number
	private weight : number

	constructor (id : number, name : string, age : number, height : number, weight : number) {
		setId(id)
		setName(name)
		setAge(age)
		setHeight(height)
		setWeight(weight)

	}

	public setId (id : number) {
		this.id = id
	}

	public setName (name : string) : void {
		this.name = name
	}

	public setAge (age : string) : void {
		this.age = age
	}

	public setHeight (height : string) : void {
		this.height = height
	}

	public setWeight (weight : string) : void {
		this.weight = weight
	}

	public getId () : number {
		return this.id
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
	private id : number
	private name : string
	private students : Student[]
	private last_student_id_reference : number = 1  
	
	constructor (id : number, name : string, students : Student[]) {
		setId(id)
		setName(name)
		setStudents(students)
		obj_globals.student_id_reference = obj_globals.student_id_reference + 1
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
		return getStudents().length
	}

	public getAgesMean () : number {
		const students : Student[] = this.getStudents()
		const ages_sum : number = students.reduce((sum, student) => sum + student.getAge(), 0)
		const ages_mean : number = ages_sum/getNumStudents()
		return ages_mean
	}

	public getHeightsMean () : number {
		const students : Student[] = this.getStudents()
		const heights_sum : number = students.reduce((sum, student) => sum + student.getHeight(), 0)
		const heights_mean : number = heights_sum/getNumStudents()
		return heights_mean
	}

	public getWeightsMean () : number {
		const students : Student[] = this.getStudents()
		const weights_sum : number = students.reduce((sum, student) => sum + student.getWeight(), 0)
		const weights_mean : number = weights_sum/getNumStudents()
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
const _class = new Class(1, 'Physical Education Class', students)


const addNewStudent = (_class) => {
	private id : number
	private name : string
	private age : number
	private height : number
	private weight : number


	const id = _class.getLastStudentIdReference()
	_class.newStudentCreated()
	const name : string = (<HTMLInputElemnt>document.querySelector('#input-name')).value
	const age : number = (<HTMLInputElement>document.querySelector('#input-age')).value
	// const 
}
