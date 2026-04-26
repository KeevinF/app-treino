class PersonalDashboard {
    constructor() {
        this.photoData = null;
        this.init();
    }

    init() {
        this.checkAuthorization();
        this.setupEventListeners();
        this.loadPersonalization();
    }

    /**
     * Verifica se o usuário está autorizado (é um personal logado)
     */
    checkAuthorization() {
        const token = localStorage.getItem('access_token');
        const userType = localStorage.getItem('user_type');

        if (!token || userType !== 'personal') {
            window.location.href = '/';
        }
    }

    /**
     * Configura os listeners de eventos
     */
    setupEventListeners() {
        // Upload de foto
        const photoInput = document.getElementById('personalPhoto');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
        }

        // Seletor de cores primária
        const primaryColor = document.getElementById('primaryColor');
        if (primaryColor) {
            primaryColor.addEventListener('change', (e) => this.updatePrimaryColor(e));
        }

        // Seletor de cores secundária
        const secondaryColor = document.getElementById('secondaryColor');
        if (secondaryColor) {
            secondaryColor.addEventListener('change', (e) => this.updateSecondaryColor(e));
        }

        // Botão de salvar
        const saveBtn = document.querySelector('.btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePersonalization());
        }
    }

    /**
     * Trata o upload da foto
     */
    handlePhotoUpload(event) {
        const file = event.target.files[0];

        if (!file) return;

        // Validar tipo de arquivo
        if (!file.type.includes('image/png')) {
            this.showError('Por favor, selecione um arquivo PNG');
            return;
        }

        // Ler arquivo e converter para base64
        const reader = new FileReader();
        reader.onload = (e) => {
            this.photoData = e.target.result;
            this.displayPhotoPreview(this.photoData);
        };
        reader.readAsDataURL(file);
    }

    /**
     * Exibe preview da foto
     */
    displayPhotoPreview(photoData) {
        const preview = document.getElementById('photoPreview');
        if (preview) {
            preview.innerHTML = `<img src="${photoData}" alt="Preview da foto" />`;
        }
    }

    /**
     * Atualiza a exibição da cor primária
     */
    updatePrimaryColor(event) {
        const color = event.target.value;
        const hexLabel = document.getElementById('primaryColorHex');
        if (hexLabel) {
            hexLabel.textContent = color;
        }
        this.updatePreview();
    }

    /**
     * Atualiza a exibição da cor secundária
     */
    updateSecondaryColor(event) {
        const color = event.target.value;
        const hexLabel = document.getElementById('secondaryColorHex');
        if (hexLabel) {
            hexLabel.textContent = color;
        }
        this.updatePreview();
    }

    /**
     * Atualiza a prévia de cores
     */
    updatePreview() {
        const primary = document.getElementById('primaryColor')?.value || '#00d4ff';
        const secondary = document.getElementById('secondaryColor')?.value || '#0099cc';
        const preview = document.getElementById('previewBox');

        if (preview) {
            preview.style.background = `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
        }
    }

    /**
     * Carrega personalização existente
     */
    async loadPersonalization() {
        try {
            // Verificar dados salvos localmente primeiro
            const localData = localStorage.getItem('personalData');
            if (localData) {
                const personalization = JSON.parse(localData);
                this.applyLoadedData(personalization);
            }
        } catch (error) {
            console.error('Erro ao carregar personalização:', error);
        }
    }

    /**
     * Aplica dados carregados aos campos
     */
    applyLoadedData(personalization) {
        // Nome do personal
        const personalNameInput = document.getElementById('personalName');
        if (personalNameInput && personalization.personalName) {
            personalNameInput.value = personalization.personalName;
        }

        // Nome do aluno
        const studentNameInput = document.getElementById('studentName');
        if (studentNameInput && personalization.studentName) {
            studentNameInput.value = personalization.studentName;
        }

        // Cores
        if (personalization.primaryColor) {
            document.getElementById('primaryColor').value = personalization.primaryColor;
            document.getElementById('primaryColorHex').textContent = personalization.primaryColor;
        }

        if (personalization.secondaryColor) {
            document.getElementById('secondaryColor').value = personalization.secondaryColor;
            document.getElementById('secondaryColorHex').textContent = personalization.secondaryColor;
        }

        // Foto
        if (personalization.photoData) {
            this.photoData = personalization.photoData;
            this.displayPhotoPreview(personalization.photoData);
        }

        this.updatePreview();
    }

    /**
     * Coleta os dados do formulário
     */
    collectFormData() {
        return {
            personalName: document.getElementById('personalName')?.value || '',
            studentName: document.getElementById('studentName')?.value || '',
            primaryColor: document.getElementById('primaryColor')?.value || '#00d4ff',
            secondaryColor: document.getElementById('secondaryColor')?.value || '#0099cc',
            photoData: this.photoData || null
        };
    }

    /**
     * Valida os dados antes de salvar
     */
    validateFormData(data) {
        if (!data.personalName.trim()) {
            this.showError('Por favor, preencha o nome do personal');
            return false;
        }

        if (!data.studentName.trim()) {
            this.showError('Por favor, preencha o nome do aluno');
            return false;
        }

        return true;
    }

    /**
     * Salva a personalização
     */
    async savePersonalization() {
        const data = this.collectFormData();

        // Validar dados
        if (!this.validateFormData(data)) {
            return;
        }

        const token = localStorage.getItem('access_token');

        try {
            const response = await fetch('/api/personalization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Salvar no localStorage para uso imediato
                localStorage.setItem('personalData', JSON.stringify(data));
                this.showSuccess('✓ Personalização salva com sucesso!');
            } else {
                const errorData = await response.json();
                this.showError(errorData.msg || 'Erro ao salvar personalização');
            }
        } catch (error) {
            console.error('Erro:', error);
            this.showError('Erro ao conectar com o servidor');
        }
    }

    /**
     * Exibe mensagem de sucesso
     */
    showSuccess(message) {
        const successMsg = document.getElementById('successMessage');
        if (successMsg) {
            successMsg.textContent = message;
            successMsg.classList.add('show');

            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 3000);
        }
    }

    /**
     * Exibe mensagem de erro
     */
    showError(message) {
        const errorMsg = document.getElementById('errorMessage');
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.classList.add('show');

            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 3000);
        } else {
            alert(message);
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.personalDashboard = new PersonalDashboard();
});
