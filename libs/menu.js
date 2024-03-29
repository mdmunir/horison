const m = [
    {label: 'Waktu shalat', 'url': '/shalat', icon: 'nav-icon fas fa-mosque'},
    {label: 'Posisi matahari', 'url': '/sun', icon: 'nav-icon fas fa-sun'},
    {label: 'Posisi bulan', 'url': '/moon', icon: 'nav-icon far fa-moon'},
    {label: 'Hilal', 'url': '/hilal', icon: 'far fa-moon nav-icon',
        names: ['hilal-month', 'hilal-month-id', 'hilal-month-map']},
    {label: 'Gerhana Matahari', 'url': '/solar-eclipse', icon: 'fas fa-circle nav-icon',
        names: ['solar-eclipse-date', 'solar-eclipse-date-map']},
    {label: 'Kalender Hijriah', 'url': '/calendar', icon: 'nav-icon far fa-calendar'},
    {label: 'Generate Polynom', 'url': '/polynom', icon: 'nav-icon fas fa-calculator'},
    {label: 'Kalkulator', 'url': '/calc', icon: 'nav-icon fas fa-calculator'},
];

export default m;