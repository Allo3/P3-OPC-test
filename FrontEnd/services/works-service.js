
export function deleteProject(idProject, listProjects, modalBody, modalForm) {
    return fetch(`http://localhost:5678/api/works/${idProject}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(response => {
            if (response.ok) {
                const projectInArray = listProjects.find((proj) => proj.id === idProject);
                if(projectInArray){
                    const indexToRemove = listProjects.indexOf(projectInArray);
                    listProjects.splice(indexToRemove, 1);
                }
                // Projet supprimé passé en état true (voir ligne 89)
                modalBody.removeChild(modalForm);
                const galleryProject = document.getElementById(`${idProject}`);
                galleryProject.remove();
            }
            return listProjects;
        }
    )
}

export function addProject(newProject) {
    return fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: newProject
    })
}

export async function getAllProject() {
    return await fetch("http://localhost:5678/api/works").then(response => response.json()).then(data => Object.values(data));
}