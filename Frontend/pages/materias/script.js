const api_url = "http://localhost:3000/api/subjects";

const display_wrapper = document.getElementById("display-wrapper");
const display_subjects = document.getElementById("display-subjects");

function create_add_subject_form() {
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input_nome = document.createElement('input');
    const input_descricao = document.createElement('input');
    const button = document.createElement('button');

    form.id = "add-subject-form";
    label.innerText = "Adicionar Materia";

    input_nome.id = "add-subject-name";
    input_nome.placeholder = "Nome da Disciplina";
    input_nome.required = true;

    input_descricao.id = "add-subject-description";
    input_descricao.placeholder = "Descrição";
    input_descricao.required = true;

    button.type = 'submit';
    button.innerText = "Salvar";

    form.appendChild(label);
    form.appendChild(input_nome);
    form.appendChild(input_descricao);
    form.appendChild(button);

    return form;
}

window.onload = () => {
    const user_role = localStorage.getItem('user_role');

    if (user_role) {
        const add_subject_form_allowed_roles = ['coordenador', 'professor'];

        if (add_subject_form_allowed_roles.includes(user_role)) {
            const add_subject_form = create_add_subject_form();
            add_subject_form.onsubmit = add_subject;

            display_wrapper.insertBefore(add_subject_form, display_subjects);
        }
    }

    get_all_subject();

};

function handleUpdateSubject(subject_id) {
    getSubjectDetails(subject_id)
        .then(subject_info => {
            const new_subject_nome = prompt("Digite um novo nome", subject_info.nome);
            const new_subject_descricao = prompt("Digite uma nova descricao", subject_info.descricao);

            update_subject(subject_id, {
                nome: new_subject_nome,
                descricao: new_subject_descricao
            })
                .then(() => get_all_subject())
                .catch(error => alert("Erro ao atualizar materia"));
        })
        .catch(error => alert("Erro ao buscar os dados da materia"));
}

async function getSubjectDetails(subject_id) {
    try {
        const response = await fetch(`${api_url}/${subject_id}`, {
            method: 'GET',
            headers: {
                "authorization": localStorage.getItem('token')
            },
        });

        const data = await response.json();

        return {
            nome: data.nome,
            descricao: data.descricao
        };

    } catch (error) {
        alert("Erro ao buscar detalhes da Materia.");
    }
}

function get_all_subject() {
    const display_container = document.getElementById('display-subjects');
    display_container.innerText = "";

    fetch(api_url, {
        method: 'GET',
        headers: {
            "authorization": localStorage.getItem('token')
        },
    })
        .then(response => response.json())
        .then(response => {
            response.map(subject => {
                const user_role = localStorage.getItem('user_role');
                const update_button_allowed_roles = ['coordenador', 'professor'];
                const delete_button_allowed_roles = ['coordenador', 'professor'];

                const div = document.createElement("div");
                const span_name = document.createElement("span");
                const span_description = document.createElement("span");

                span_name.appendChild(document.createTextNode(subject.nome));
                span_description.appendChild(document.createTextNode(subject.descricao));

                div.appendChild(span_name);
                div.appendChild(span_description);

                if (update_button_allowed_roles.includes(user_role)) {
                    const update_button = document.createElement("button");
                    update_button.appendChild(document.createTextNode("Atualizar"));
                    update_button.type = "button";
                    update_button.onclick = () => handleUpdateSubject(subject._id);

                    div.appendChild(update_button);
                }
                
                if (delete_button_allowed_roles.includes(user_role)) {
                    const delete_button = document.createElement("button");
                    delete_button.appendChild(document.createTextNode("Deletar"));
                    delete_button.type = "button";
                    delete_button.onclick = () => delete_subject(subject._id);

                    div.appendChild(delete_button);
                }

                div.className = "subject-item";


                display_container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
};

function add_subject(e) {
    e.preventDefault();

    const subject_name = document.getElementById('add-subject-name');
    const subject_description = document.getElementById('add-subject-description');

    fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({
            nome: subject_name.value,
            descricao: subject_description.value
        })
    })
        .then(response => response.json())
        .then(response => {
            alert(response.message);

            subject_name.value = "";
            subject_description.value = "";

            get_all_subject();
        })
        .catch(error => console.log);

};

function delete_subject(subject_id) {
    const data = fetch(`${api_url}/${subject_id}`, {
        method: 'DELETE',
        headers: {
            "authorization": localStorage.getItem('token')
        },
    })
        .then(response => response.json())
        .then(response => {
            alert("Materia apagada com sucesso");

            get_all_subject();
        });
};

async function update_subject(subject_id, subject_info) {
    await fetch(`${api_url}/${subject_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({
            nome: subject_info.nome,
            descricao: subject_info.descricao
        })
    });
}

