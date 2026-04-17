function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    calendarElement.innerHTML = '';

    // Achar o início da semana (Domingo)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);

        const dayName = daysOfWeek[dayDate.getDay()];
        const dayNumber = dayDate.getDate();
        const isActive = dayDate.toDateString() === now.toDateString() ? 'active' : '';

        const dayHTML = `
            <div class="day-item ${isActive}">
                <span class="day-label">${dayName}</span>
                <span class="day-number">${dayNumber}</span>
            </div>
        `;
        calendarElement.innerHTML += dayHTML;
    }
}

function testarNomes() {
    const nomeAluno = document.getElementById('input-aluno').value;
    const nomePersonal = document.getElementById('input-personal').value;
    const arquivoFoto = document.getElementById('upload-foto').files[0]; // Pega o arquivo selecionado

    if (nomeAluno) document.getElementById('student-name').innerText = nomeAluno;
    if (nomePersonal) document.getElementById('personal-actual-name').innerText = nomePersonal;

    // Lógica para processar a foto enviada
    if (arquivoFoto) {
        const reader = new FileReader();

        // Quando o navegador terminar de ler o arquivo...
        reader.onload = function (e) {
            // Define o src da imagem do header com o conteúdo do arquivo
            document.getElementById('img-personal').src = e.target.result;
        };

        // Lê o arquivo como uma URL de dados (base64)
        reader.readAsDataURL(arquivoFoto);
    }
}

// Inicialização
window.onload = () => {
    generateCalendar();
};