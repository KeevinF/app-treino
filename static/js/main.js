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

function toggleTheme() {
    const html = document.documentElement; // Pega a tag <html>
    const currentTheme = html.getAttribute('data-theme');

    // Se estiver claro, vira escuro. Se estiver escuro, vira claro.
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);

    // Opcional: Salva a escolha para quando você der F5
    localStorage.setItem('theme', newTheme);

    console.log("Tema alterado para: " + newTheme);
}

// Isso aqui garante que o tema salvo seja aplicado ao abrir o site
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
});