"use strict";
const obj_globals = {
    current_student_position: 0
};
class Student {
    constructor(id, name, age, height, weight) {
        this.id = 0;
        this.name = '';
        this.age = 0;
        this.height = 0;
        this.weight = 0;
        this.setId(id);
        this.setName(name);
        this.setAge(age);
        this.setHeight(height);
        this.setWeight(weight);
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setAge(age) {
        this.age = age;
    }
    setHeight(height) {
        this.height = height;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getId() {
        return this.id;
    }
    getAge() {
        return this.age;
    }
    getName() {
        return this.name;
    }
    getHeight() {
        return this.height;
    }
    getWeight() {
        return this.weight;
    }
    duplicatedStudent(another_student) {
        const sameName = another_student.getName() === this.getName();
        const sameAge = another_student.getAge() === this.getAge();
        const sameHeight = another_student.getHeight() === this.getHeight();
        const sameWeight = another_student.getWeight() === this.getWeight();
        if (sameName && sameAge && sameHeight && sameWeight)
            return true;
        else
            return false;
    }
}
class Class {
    constructor(id, name, students) {
        this.id = 0;
        this.name = '';
        this.students = [];
        this.last_student_id_reference = 1;
        this.setId(id);
        this.setName(name);
        this.setStudents(students);
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setStudents(students) {
        this.students = students;
    }
    getStudents() {
        return this.students;
    }
    getNumStudents() {
        return this.getStudents().length;
    }
    getAgesMean() {
        const students = this.getStudents();
        const ages_sum = students.reduce((sum, student) => sum + student.getAge(), 0);
        const ages_mean = ages_sum / this.getNumStudents();
        return ages_mean;
    }
    getHeightsMean() {
        const students = this.getStudents();
        const heights_sum = students.reduce((sum, student) => sum + student.getHeight(), 0);
        const heights_mean = heights_sum / this.getNumStudents();
        return heights_mean;
    }
    getWeightsMean() {
        const students = this.getStudents();
        const weights_sum = students.reduce((sum, student) => sum + student.getWeight(), 0);
        const weights_mean = weights_sum / this.getNumStudents();
        return weights_mean;
    }
    newStudentCreated() {
        this.last_student_id_reference++;
    }
    getLastStudentIdReference() {
        return this.last_student_id_reference;
    }
}
function enableEditingStudent() {
    const currentNode = this;
    const students = _class.getStudents();
    const card = currentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    const cards_collection = document.getElementsByClassName('row w-75 mb-1');
    let student_position = 0;
    for (let i = 0; i < cards_collection.length; i++) {
        if (cards_collection[i] === card)
            student_position = i;
    }
    // console.log(student_position)
    obj_globals.current_student_position = student_position;
    const reference_id = students[student_position].getId();
    const input_name = document.querySelector(`#input-name-edit-${reference_id}`);
    const input_age = document.querySelector(`#input-age-edit-${reference_id}`);
    const input_height = document.querySelector(`#input-height-edit-${reference_id}`);
    const input_weight = document.querySelector(`#input-weight-edit-${reference_id}`);
    const save_updates_button = document.querySelector(`#save-updates-button-${reference_id}`);
    const inputs = [];
    inputs.push(input_name);
    inputs.push(input_age);
    inputs.push(input_height);
    inputs.push(input_weight);
    for (const input of inputs) {
        input.readOnly = false;
        input.classList.add('bg-light');
        input.classList.replace('border-0', 'border-1');
        input.classList.add('rounded');
        input.classList.add('p-1');
    }
    save_updates_button.classList.replace('d-none', 'd-block');
}
function deleteStudent() {
    var _a;
    const currentNode = this;
    const card = currentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    const cards_collection = document.getElementsByClassName('row w-75 mb-1');
    let student_position = 0;
    for (let i = 0; i < cards_collection.length; i++) {
        if (cards_collection[i] === card)
            student_position = i;
    }
    (_a = document.querySelector('#students-info-container')) === null || _a === void 0 ? void 0 : _a.children[student_position].remove();
    _class.getStudents().splice(student_position, 1);
    updateStatistics( /*_class*/);
}
const students = [];
const _class = new Class(1, 'Physical Education Class', students);
const updateStatistics = ( /*_class : Class*/) => {
    const ages_mean_input = document.querySelector('#input-ages-mean');
    const heights_mean_input = document.querySelector('#input-heights-mean');
    const weights_mean_input = document.querySelector('#input-weights-mean');
    ages_mean_input.value = String(_class.getAgesMean());
    heights_mean_input.value = String(_class.getHeightsMean());
    weights_mean_input.value = String(_class.getWeightsMean());
};
const saveUpdates = () => {
    const students = _class.getStudents();
    const student_position = obj_globals.current_student_position;
    const reference_id = students[obj_globals.current_student_position].getId();
    const input_name = document.querySelector(`#input-name-edit-${reference_id}`);
    const input_age = document.querySelector(`#input-age-edit-${reference_id}`);
    const input_height = document.querySelector(`#input-height-edit-${reference_id}`);
    const input_weight = document.querySelector(`#input-weight-edit-${reference_id}`);
    const save_updates_button = document.querySelector(`#save-updates-button-${reference_id}`);
    const input_name_value = input_name.value;
    const input_age_value = parseInt(input_age.value);
    const input_height_value = parseFloat(input_height.value);
    const input_weight_value = parseFloat(input_weight.value);
    students[student_position].setName(input_name_value);
    students[student_position].setAge(input_age_value);
    students[student_position].setHeight(input_height_value);
    students[student_position].setWeight(input_weight_value);
    const inputs = [];
    inputs.push(input_name);
    inputs.push(input_age);
    inputs.push(input_height);
    inputs.push(input_weight);
    for (const input of inputs) {
        input.readOnly = true;
        input.classList.remove('bg-light');
        input.classList.replace('border-1', 'border-0');
        input.classList.remove('rounded');
        input.classList.remove('p-1');
    }
    save_updates_button.classList.replace('d-block', 'd-none');
    updateStatistics();
    console.log(_class.getStudents());
};
const addNewStudent = (_class) => {
    const id = _class.getLastStudentIdReference();
    let name = document.querySelector('#input-name').value;
    const surname = document.querySelector('#input-surname').value;
    const age_string = document.querySelector('#input-age').value;
    const height_string = document.querySelector('#input-height').value;
    const weight_string = document.querySelector('#input-weight').value;
    if (name === '' || surname === '' || age_string == '' || height_string == '' || weight_string == '') {
        alert('Preencha todos os campos');
        return;
    }
    const age = parseInt(document.querySelector('#input-age').value);
    const height = parseFloat(document.querySelector('#input-height').value);
    const weight = parseFloat(document.querySelector('#input-weight').value);
    name = `${name} ${surname}`;
    const new_student = new Student(id, name, age, height, weight);
    const students = _class.getStudents();
    for (const student of students) {
        if (new_student.duplicatedStudent(student)) {
            alert('Não é possível adicionar estudantes duplicados (com os mesmos nome, idade, altura e peso)');
            return;
        }
    }
    students.push(new_student);
    const students_info_container = document.querySelector('#students-info-container');
    const reference_id = _class.getLastStudentIdReference();
    let card_element_string = `
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
	`;
    card_element_string = card_element_string.trim();
    students_info_container.innerHTML = students_info_container.innerHTML + card_element_string;
    const close_buttons = document.querySelectorAll('.close-button-card');
    const edit_buttons = document.querySelectorAll('.edit-button-card');
    const save_updates_buttons = document.querySelectorAll('.save-updates-button');
    for (let i = 0; i < close_buttons.length; i++) {
        close_buttons[i].addEventListener('click', deleteStudent, false);
        edit_buttons[i].addEventListener('click', enableEditingStudent, false);
        save_updates_buttons[i].addEventListener('click', saveUpdates, false);
    }
    updateStatistics( /*_class*/);
    _class.newStudentCreated();
};
const interval = setInterval(() => {
    const button_add_new_student = document.querySelector('#button-add-new-student');
    if (document.contains(button_add_new_student)) {
        button_add_new_student === null || button_add_new_student === void 0 ? void 0 : button_add_new_student.addEventListener('click', () => { addNewStudent(_class); });
        clearInterval(interval);
    }
}, 500);
