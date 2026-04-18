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