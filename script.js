document.addEventListener('DOMContentLoaded', function() {
    fetch('data.csv') // Načte data.csv
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').filter(line => line.trim() !== ''); // Rozdělí řádky a odstraní prázdné
            const labels = [];
            const values = [];

            // Přeskočí první řádek (hlavičku, pokud je)
            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(','); // Rozdělí řádek podle čárky
                if (parts.length >= 2) { // Zajištění, že existují alespoň dva sloupce
                    labels.push(parts[0].trim()); // První sloupec jako label
                    values.push(parseFloat(parts[1].trim())); // Druhý sloupec jako hodnota
                }
            }

            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar', // Typ grafu: sloupcový
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Moje Data',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Došlo k chybě při načítání CSV souboru:', error);
        });
});
