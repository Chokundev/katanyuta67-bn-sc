var jsonData = [
    {
      "list": "1",
      "type": "เจ้าภาพบรรพชาสามเณร",
      "date": "๒๒ ก.ย. ๖๗",
      "name": "คุณธีรชานนท์ พวงเงิน"
    },
    {
        "list": "2",
        "type": "เจ้าภาพภัตตาหารเพล",
        "name": "คุณธีรชานนท์ พวงเงิน"
      }
  ]
  
    const tableBody = document.getElementById('tableBody');
  
    // Loop through the JSON data and generate HTML for each entry
    jsonData.forEach(entry => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');
  
        row.innerHTML = `
            <td class="py-3 px-2 text-center whitespace-nowrap">
                <div class="flex items-center">
                    <span class="font-medium">${entry.list}</span>
                </div>
            </td>
            <td class="py-3 px-3 text-left">
                <div class="flex items-center">
                    <span>${entry.type}</span>
                </div>
            </td>
            <td class="py-3 px-4 text-left">
                <div class="flex items-center">
                    <span>${entry.date}</span>
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