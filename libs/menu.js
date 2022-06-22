const m = [
    {label: 'Waktu shalat', 'url': '/shalat', icon: 'nav-icon fas fa-mosque'},
    {label: 'Posisi matahari', 'url': '/sun', icon: 'nav-icon fas fa-sun'},
    {label: 'Posisi bulan', 'url': '/moon', icon: 'nav-icon far fa-moon'},
    {label: 'Hilal', icon: 'nav-icon far fa-moon',
        children: [
            {label: 'Indonesia', 'url': '/hilal-id', icon: 'far fa-circle nav-icon',},
            //{label: 'Lokal', 'url': '/hilal-local', icon: 'far fa-circle nav-icon',}
        ]
    },
    {label: 'Kalender Hijriah', 'url': '/calendar', icon: 'nav-icon far fa-calendar'},
    {label: 'Generate Polynom', 'url': '/polynom', icon: 'nav-icon fas fa-calculator'},
    {label: 'Kalkulator', 'url': '/calc', icon: 'nav-icon fas fa-calculator'},
];

export default m;