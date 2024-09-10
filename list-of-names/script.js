const tableBody = document.getElementById('tableBody');

// Function to fetch data from the API and update the table
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxxkL15YPMwIotXNLnc69jt4RM2TUDfJVLGNzNwzhKOhwVFmq4u0FB7N7yIKEbyerOh/exec');
        const jsonData = await response.json(); // Assuming the response is in JSON format
        
        // Clear the existing table content before updating
        tableBody.innerHTML = '';

        // Loop through the JSON data and generate HTML for each entry
        jsonData.forEach(entry => {
            const row = document.createElement('tr');
            row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');

            row.innerHTML = `
                <td class="py-3 px-2 text-center whitespace-nowrap">
                    <div class="flex items-center">
                        <span class="font-bold">${entry.list}</span>
                    </div>
                </td>
                <td class="py-3 px-3 text-left">
                    <div class="flex items-center">
                        <span>${entry.type}</span>
                    </div>
                </td>
                <td class="py-3 px-4 text-left">
                    <div class="flex items-center">
                        <span>${entry.date || '-'}</span> <!-- Handle undefined date -->
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex items-center justify-center">
                        <span>${entry.name}</span>
                    </div>
                </td>
            `;

            // Append the row to the tbody
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function every 1000 milliseconds (1 second)
setInterval(fetchData, 1000);
