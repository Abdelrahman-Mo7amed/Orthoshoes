// dashboard.js
document.addEventListener('DOMContentLoaded', function () {
    // Section Switching
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = item.id.replace('-btn', '');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            menuItems.forEach(menu => {
                menu.classList.remove('active');
            });
            item.classList.add('active');
        });
    });

    // Charts using Chart.js
    const ctx1 = document.getElementById('performance-chart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Goals Scored',
                data: [5, 7, 8, 6, 9, 11, 10],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} goals`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#333'
                    },
                    grid: {
                        color: '#ddd'
                    }
                },
                y: {
                    ticks: {
                        color: '#333'
                    },
                    grid: {
                        color: '#ddd'
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById('heart-rate-chart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: [72, 76, 80, 85, 90, 88, 82],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} bpm`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#333'
                    },
                    grid: {
                        color: '#ddd'
                    }
                },
                y: {
                    ticks: {
                        color: '#333'
                    },
                    grid: {
                        color: '#ddd'
                    }
                }
            }
        }
    });

    const ctx3 = document.getElementById('pitch-places-chart').getContext('2d');
    new Chart(ctx3, {
        type: 'radar',
        data: {
            labels: ['Defense', 'Midfield', 'Attack'],
            datasets: [{
                label: 'Places Covered',
                data: [60, 80, 75],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    ticks: {
                        color: '#333'
                    },
                    grid: {
                        color: '#ddd'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `Coverage: ${tooltipItem.raw} units`;
                        }
                    }
                }
            }
        }
    });
});


// Initialize Chart.js with custom colors
const ctxHeartRate = document.getElementById('heart-rate-chart').getContext('2d');
const ctxPitchCoverage = document.getElementById('pitch-coverage-chart').getContext('2d');

const heartRateChart = new Chart(ctxHeartRate, {
    type: 'line',
    data: {
        labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
        datasets: [{
            label: 'Heart Rate',
            data: [75, 80, 78, 85, 90, 87, 82],
            borderColor: 'var(--egyptian-blue)',
            backgroundColor: 'rgba(0, 53, 148, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--orange-web)',
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: 'var(--oxford-blue)',
                }
            },
            y: {
                ticks: {
                    color: 'var(--oxford-blue)',
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'var(--oxford-blue)'
                }
            }
        }
    }
});

const pitchCoverageChart = new Chart(ctxPitchCoverage, {
    type: 'bar',
    data: {
        labels: ['Left Wing', 'Center', 'Right Wing'],
        datasets: [{
            label: 'Pitch Coverage (m²)',
            data: [250, 400, 300],
            backgroundColor: 'var(--jonquil)',
            borderColor: 'var(--orange-web)',
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: 'var(--oxford-blue)',
                }
            },
            y: {
                ticks: {
                    color: 'var(--oxford-blue)',
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'var(--oxford-blue)'
                }
            }
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    const ctxGoals = document.getElementById('goalsChart').getContext('2d');
    const ctxAssists = document.getElementById('assistsChart').getContext('2d');
    const ctxDistance = document.getElementById('distanceChart').getContext('2d');

    // Chart for Goals
    new Chart(ctxGoals, {
        type: 'bar',
        data: {
            labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
            datasets: [{
                label: 'Goals',
                data: [2, 1, 3, 2, 0],
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                borderColor: 'rgba(255, 165, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart for Assists
    new Chart(ctxAssists, {
        type: 'line',
        data: {
            labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
            datasets: [{
                label: 'Assists',
                data: [1, 0, 2, 1, 1],
                fill: false,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart for Distance Covered
    new Chart(ctxDistance, {
        type: 'pie',
        data: {
            labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
            datasets: [{
                label: 'Distance Covered',
                data: [10, 12, 9, 11, 10],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize heart rate chart
    const ctxHeartRate = document.getElementById('heartRateChart').getContext('2d');
    new Chart(ctxHeartRate, {
        type: 'line',
        data: {
            labels: ['Warm-Up', '1st Half', 'Half-Time', '2nd Half', 'Cool-Down'],
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: [80, 120, 100, 130, 90],
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Heart Rate (bpm)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Session Phases'
                    }
                }
            }
        }
    });

    // Initialize pitch coverage chart
    const ctxPitchCoverage = document.getElementById('pitchCoverageChart').getContext('2d');
    new Chart(ctxPitchCoverage, {
        type: 'radar',
        data: {
            labels: ['Left Side', 'Right Side', 'Center', 'Attacking Third', 'Defensive Third'],
            datasets: [{
                label: 'Pitch Coverage (m²)',
                data: [150, 180, 200, 170, 160],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                line: {
                    tension: 0.1
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    suggestedMax: 250
                }
            }
        }
    });
});




