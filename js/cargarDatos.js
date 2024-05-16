
function getRoles() {
    let roles_url = "?controller=Usuario&action=getRoles";

    fetch(BASE_URL + roles_url)
            .then(response => {
                roles = response.json();
                return roles;

            })
            .then(roles => {
                buildRolesSelect(roles);
            }).catch((error) => {
        console.log('Ha ocurrido un error: ' + error);
    });
}



function buildRolesSelect(roles) {
    let select_roles = document.querySelector('#rol');
    for (let i = 0; i < roles.length; i++) {
        let option = '<option value="' + roles[i].id + '">' + roles[i].name + '</option>';
        select_roles.innerHTML += option;
    }
}
