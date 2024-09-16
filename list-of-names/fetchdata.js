function createTable(date, data) {
    // แปลงวันที่จากรูปแบบ yyyy-mm-dd เป็นภาษาไทย
    let thaiDate = new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // แปลงตัวเลขในวันที่เป็นเลขไทย
    thaiDate = convertToThaiNumerals(thaiDate);

    let tableHtml = `
        <h5 class="text-center">วันที่ ${thaiDate}</h5>
        <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table class="min-w-full w-full table-auto">
                <thead>
                    <tr class="bg-amber-200 text-orange-950 uppercase text-sm leading-normal">
                        <th class="py-3 px-3 text-left">ลำดับ</th>
                        <th class="py-3 px-3 text-left">ประเภทเจ้าภาพ</th>
                        <th class="py-3 px-6 text-center">รายนาม</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
    `;

    // สร้าง row สำหรับข้อมูลแต่ละรายการ
    data.forEach(item => {
        tableHtml += `
            <tr>
                <td class="py-3 px-2 text-center whitespace-nowrap">
                    <div class="flex items-center">
                        <span class="font-bold">${item.list}</span>
                    </div>
                </td>
                <td class="py-3 px-3 text-left">
                    <div class="flex items-center">
                        <span>${item.type}</span>
                    </div>
                </td>
                <td class="py-3 px-6 text-center">
                    <div class="flex items-center justify-center">
                        <span>${item.name || '-'}</span>
                    </div>
                </td>
            </tr>
        `;
    });

    // ปิดโครงสร้างตาราง
    tableHtml += `
                </tbody>
            </table>
        </div>
    `;

    return tableHtml;
}

// ฟังก์ชันดึงข้อมูลจาก API และสร้างตาราง
async function fetchAndDisplayData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxxkL15YPMwIotXNLnc69jt4RM2TUDfJVLGNzNwzhKOhwVFmq4u0FB7N7yIKEbyerOh/exec'); // ใส่ URL ของ API
        const data = await response.json();

        // จัดกลุ่มข้อมูลตามวันที่
        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.date]) acc[item.date] = [];
            acc[item.date].push(item);
            return acc;
        }, {});

        // สร้างตารางตามวันที่
        const container = document.getElementById('tablesContainer');
        container.innerHTML = ''; // ล้างข้อมูลเก่า

        for (const [date, records] of Object.entries(groupedData)) {
            const tableHtml = createTable(date, records);
            container.insertAdjacentHTML('beforeend', tableHtml);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าโหลดเสร็จ
window.onload = fetchAndDisplayData;

// ฟังก์ชันแปลงตัวเลขเป็นเลขไทย
function convertToThaiNumerals(dateStr) {
    const thaiNumbers = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
    return dateStr.replace(/[0-9]/g, (digit) => thaiNumbers[digit]);
}

setInterval(fetchAndDisplayData, 1000);
