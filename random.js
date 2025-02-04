

document.getElementById('randomButton').addEventListener('click', async () => {
    try {
        const schoolResponse = await fetch('school-list.tsv');
        const schoolText = await schoolResponse.text();
        const schoolLines = schoolText.split('\n').filter(line => line.trim() !== '');
        if (schoolLines.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * schoolLines.length);
        const selectedLine = schoolLines[randomIndex].split('\t');
        
        const row = document.getElementById('schoolData');
        row.innerHTML = selectedLine.map(cell => `<td>${cell}</td>`).join('');
        
        const selectedDistrict = selectedLine[3];
        
        const districtResponse = await fetch('district.csv');
        const districtText = await districtResponse.text();
        const districtLines = districtText.split('\n').map(line => line.split(','));
        
        const matchedDistrict = districtLines.find(d => d[4] === selectedDistrict);
        
        if (matchedDistrict) {
            const phoneNumber = `${matchedDistrict[5]}-12345`;
            document.getElementById('contactInfo').textContent = `联系电话: ${phoneNumber}`;
            
            const callButton = document.getElementById('callButton');
            callButton.style.display = 'block';
            callButton.onclick = () => {
                window.location.href = `tel:${phoneNumber}`;
            };
        }
    } catch (error) {
        console.error('数据加载失败', error);
    }
});
