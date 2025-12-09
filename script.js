// Polygon calculation utilities
function calculatePolygonProperties(nSides, sideLength = 1) {
    if (nSides < 3) return null;
    
    const interiorAngle = (nSides - 2) * 180 / nSides;
    const exteriorAngle = 360 / nSides;
    const perimeter = nSides * sideLength;
    const apothem = sideLength / (2 * Math.tan(Math.PI / nSides));
    const area = 0.5 * perimeter * apothem;
    const centralAngle = 360 / nSides;
    
    return {
        interiorAngle,
        exteriorAngle,
        perimeter,
        area,
        centralAngle,
        apothem
    };
}

function createRegularPolygon(nSides, centerX, centerY, radius) {
    const points = [];
    for (let i = 0; i <= nSides; i++) {
        const angle = (i * 2 * Math.PI) / nSides - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push({ x, y });
    }
    return points;
}

function drawPolygon(ctx, points, fillColor, strokeColor, lineWidth = 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawVertex(ctx, x, y, label) {
    // Draw point
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff4444';
    ctx.fill();
    
    // Draw label
    ctx.fillStyle = '#000';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(label, x + 10, y + 5);
}

function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding module
        const module = btn.dataset.module;
        document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
        document.getElementById(module).classList.add('active');
        
        // Redraw canvas for active module
        updateActiveModule(module);
    });
});

function updateActiveModule(module) {
    switch(module) {
        case 'introduction':
            updateIntroModule();
            break;
        case 'explorer':
            updateExplorerModule();
            break;
        case 'calculator':
            updateCalculatorModule();
            break;
        case 'quiz':
            updateQuizModule();
            break;
        case 'art':
            updateArtModule();
            break;
    }
}

// Module 1: Introduction to Polygons
function updateIntroModule() {
    const sides = parseInt(document.getElementById('intro-sides').value);
    document.getElementById('intro-sides-value').textContent = sides;
    
    const props = calculatePolygonProperties(sides);
    
    // Update properties display
    document.querySelector('#intro-properties .prop-vertices').textContent = sides;
    document.querySelector('#intro-properties .prop-sides').textContent = sides;
    document.querySelector('#intro-properties .prop-sum-angles').textContent = (sides - 2) * 180;
    document.querySelector('#intro-properties .prop-interior-angle').textContent = props.interiorAngle.toFixed(1);
    document.querySelector('#intro-properties .prop-exterior-angle').textContent = props.exteriorAngle.toFixed(1);
    
    // Update heading
    const heading = sides === 3 ? 'Triangle' :
                    sides === 4 ? 'Quadrilateral' :
                    sides === 5 ? 'Pentagon' :
                    sides === 6 ? 'Hexagon' :
                    sides === 7 ? 'Heptagon' :
                    sides === 8 ? 'Octagon' :
                    sides === 9 ? 'Nonagon' :
                    sides === 10 ? 'Decagon' :
                    `${sides}-sided polygon`;
    
    document.querySelector('#intro-properties h4').textContent = `Properties of this ${heading}:`;
    
    // Draw polygon
    const canvas = document.getElementById('intro-canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const points = createRegularPolygon(sides, centerX, centerY, radius);
    drawPolygon(ctx, points, 'rgba(100, 150, 255, 0.3)', '#001f5c', 2);
    
    // Draw vertices
    for (let i = 0; i < sides; i++) {
        drawVertex(ctx, points[i].x, points[i].y, `V${i + 1}`);
    }
    
    // Draw center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.fillText('Center', centerX + 10, centerY - 10);
}

document.getElementById('intro-sides').addEventListener('input', updateIntroModule);

// Module 2: Regular Polygons Explorer
function updateExplorerModule() {
    const sides = parseInt(document.getElementById('explorer-sides').value);
    const sideLength = parseFloat(document.getElementById('explorer-length').value);
    
    document.getElementById('explorer-sides-value').textContent = sides;
    document.getElementById('explorer-length-value').textContent = sideLength.toFixed(1);
    
    const props = calculatePolygonProperties(sides, sideLength);
    
    // Update metrics
    document.getElementById('explorer-interior').textContent = props.interiorAngle.toFixed(2) + '°';
    document.getElementById('explorer-exterior').textContent = props.exteriorAngle.toFixed(2) + '°';
    document.getElementById('explorer-perimeter').textContent = props.perimeter.toFixed(2);
    document.getElementById('explorer-area').textContent = props.area.toFixed(2);
    document.getElementById('explorer-apothem').textContent = props.apothem.toFixed(2);
    
    // Draw polygon
    const canvas = document.getElementById('explorer-canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (sideLength / (2 * Math.sin(Math.PI / sides))) * 150;
    
    const points = createRegularPolygon(sides, centerX, centerY, radius);
    drawPolygon(ctx, points, 'rgba(100, 150, 255, 0.3)', '#001f5c', 3);
    
    // Draw vertices
    for (let i = 0; i < sides; i++) {
        drawVertex(ctx, points[i].x, points[i].y, `V${i + 1}`);
    }
    
    // Draw center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
}

document.getElementById('explorer-sides').addEventListener('input', updateExplorerModule);
document.getElementById('explorer-length').addEventListener('input', updateExplorerModule);

// Module 3: Polygon Properties Calculator
function updateCalculatorModule() {
    const sides = parseInt(document.getElementById('calc-sides').value);
    const inputType = document.getElementById('calc-input-type').value;
    const inputValue = parseFloat(document.getElementById('calc-value').value);
    
    let sideLength;
    
    switch(inputType) {
        case 'side':
            sideLength = inputValue;
            break;
        case 'perimeter':
            sideLength = inputValue / sides;
            break;
        case 'area':
            // Approximate from area
            const apothemEst = Math.sqrt(inputValue * 2 / sides / Math.tan(Math.PI / sides));
            sideLength = 2 * apothemEst * Math.tan(Math.PI / sides);
            break;
        case 'apothem':
            sideLength = 2 * inputValue * Math.tan(Math.PI / sides);
            break;
    }
    
    const props = calculatePolygonProperties(sides, sideLength);
    
    // Update display
    document.getElementById('calc-num-sides').textContent = sides;
    document.getElementById('calc-side-length').textContent = sideLength.toFixed(3);
    document.getElementById('calc-perimeter').textContent = props.perimeter.toFixed(3);
    document.getElementById('calc-area').textContent = props.area.toFixed(3);
    document.getElementById('calc-apothem').textContent = props.apothem.toFixed(3);
    document.getElementById('calc-interior').textContent = props.interiorAngle.toFixed(2) + '°';
    document.getElementById('calc-exterior').textContent = props.exteriorAngle.toFixed(2) + '°';
    document.getElementById('calc-central').textContent = props.centralAngle.toFixed(2) + '°';
    
    // Draw polygon
    const canvas = document.getElementById('calculator-canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (sideLength / (2 * Math.sin(Math.PI / sides))) * 150;
    
    const points = createRegularPolygon(sides, centerX, centerY, radius);
    drawPolygon(ctx, points, 'rgba(100, 150, 255, 0.3)', '#001f5c', 3);
    
    // Draw vertices
    for (let i = 0; i < sides; i++) {
        drawVertex(ctx, points[i].x, points[i].y, `V${i + 1}`);
    }
}

document.getElementById('calc-sides').addEventListener('input', updateCalculatorModule);
document.getElementById('calc-input-type').addEventListener('change', updateCalculatorModule);
document.getElementById('calc-value').addEventListener('input', updateCalculatorModule);

// Module 4: Quiz & Activities
const quizQuestions = [
    {
        question: "Find the sum of inner angles of a hexagon (6 sides).",
        options: ["540°", "720°", "900°", "1080°"],
        correct: 1,
        explanation: "Formula: (n-2) × 180° = (6-2) × 180° = 4 × 180° = 720°"
    },
    {
        question: "Find each inner angle of a regular pentagon (5 sides).",
        options: ["90°", "108°", "120°", "135°"],
        correct: 1,
        explanation: "Each interior angle = (n-2) × 180° / n = (5-2) × 180° / 5 = 540° / 5 = 108°"
    },
    {
        question: "Find the sum of inner angles of a 10-sided polygon (decagon).",
        options: ["1260°", "1440°", "1620°", "1800°"],
        correct: 1,
        explanation: "Formula: (n-2) × 180° = (10-2) × 180° = 8 × 180° = 1440°"
    },
    {
        question: "Sum of interior angles of a polygon is 900 degrees. How many sides does this polygon have?",
        options: ["5 sides", "6 sides", "7 sides", "8 sides"],
        correct: 2,
        explanation: "Using formula (n-2) × 180° = 900°, we get: n-2 = 5, so n = 7 sides"
    },
    {
        question: "What is the sum of inner angles of a decagon (10 sides)?",
        options: ["1080°", "1260°", "1440°", "1620°"],
        correct: 2,
        explanation: "Formula: (n-2) × 180° = (10-2) × 180° = 8 × 180° = 1440°"
    },
    {
        question: "What is each exterior angle of a regular hexagon?",
        options: ["45°", "60°", "90°", "120°"],
        correct: 1,
        explanation: "Each exterior angle = 360° ÷ 6 = 60°"
    }
];

let currentQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;

function updateQuizModule() {
    if (currentQuestion < quizQuestions.length) {
        const q = quizQuestions[currentQuestion];
        document.querySelector('.question-text').textContent = `Question ${currentQuestion + 1}: ${q.question}`;
        
        const optionsContainer = document.querySelector('.quiz-options');
        optionsContainer.innerHTML = '';
        
        q.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => {
                document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                optionDiv.classList.add('selected');
                selectedAnswer = index;
            });
            optionsContainer.appendChild(optionDiv);
        });
        
        document.getElementById('quiz-feedback').classList.remove('show', 'correct', 'incorrect', 'info');
    }
}

document.getElementById('submit-answer').addEventListener('click', () => {
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }
    
    const q = quizQuestions[currentQuestion];
    const feedback = document.getElementById('quiz-feedback');
    
    if (selectedAnswer === q.correct) {
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = `<strong>Correct! 🎉</strong><br>${q.explanation}`;
        quizScore++;
    } else {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = `<strong>Incorrect.</strong> The correct answer is: ${q.options[q.correct]}<br>${q.explanation}`;
    }
    
    selectedAnswer = null;
    currentQuestion++;
    
    setTimeout(() => {
        if (currentQuestion >= quizQuestions.length) {
            document.getElementById('quiz-question').style.display = 'none';
            document.getElementById('quiz-complete').style.display = 'block';
            document.querySelector('.score-text').textContent = `Your score: ${quizScore}/${quizQuestions.length}`;
        } else {
            updateQuizModule();
        }
    }, 3000);
});

document.getElementById('restart-quiz').addEventListener('click', () => {
    currentQuestion = 0;
    quizScore = 0;
    document.getElementById('quiz-question').style.display = 'block';
    document.getElementById('quiz-complete').style.display = 'none';
    updateQuizModule();
});

// Tab navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding tab content
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        
        // Update canvas if needed
        if (tabName === 'angle-hunt') {
            updateAngleHunt();
        } else if (tabName === 'property-match') {
            updatePropertyMatch();
        }
    });
});

// Angle Hunt
function updateAngleHunt() {
    const sides = parseInt(document.getElementById('hunt-polygon').value);
    const props = calculatePolygonProperties(sides);
    
    const polygonNames = {
        3: 'Triangle',
        4: 'Square',
        5: 'Pentagon',
        6: 'Hexagon',
        8: 'Octagon'
    };
    
    document.getElementById('hunt-info').textContent = `This is a regular ${sides}-sided polygon (${polygonNames[sides]})`;
    
    // Draw polygon
    const canvas = document.getElementById('hunt-canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const points = createRegularPolygon(sides, centerX, centerY, radius);
    drawPolygon(ctx, points, 'rgba(100, 150, 255, 0.3)', '#001f5c', 2);
    
    for (let i = 0; i < sides; i++) {
        drawVertex(ctx, points[i].x, points[i].y, `V${i + 1}`);
    }
}

document.getElementById('hunt-polygon').addEventListener('change', updateAngleHunt);

document.getElementById('check-angles').addEventListener('click', () => {
    const sides = parseInt(document.getElementById('hunt-polygon').value);
    const props = calculatePolygonProperties(sides);
    const userInterior = parseFloat(document.getElementById('user-interior').value);
    const userExterior = parseFloat(document.getElementById('user-exterior').value);
    
    const feedback = document.getElementById('hunt-feedback');
    const interiorCorrect = Math.abs(userInterior - props.interiorAngle) < 0.1;
    const exteriorCorrect = Math.abs(userExterior - props.exteriorAngle) < 0.1;
    
    if (interiorCorrect && exteriorCorrect) {
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = '<strong>Perfect! Both angles are correct! 🎯</strong>';
    } else if (interiorCorrect) {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = '<strong>Interior angle is correct, but check the exterior angle.</strong>';
    } else if (exteriorCorrect) {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = '<strong>Exterior angle is correct, but check the interior angle.</strong>';
    } else {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = '<strong>Both angles need adjustment. Try again!</strong>';
    }
    
    feedback.innerHTML += `<br><br><em>Correct answers: Interior = ${props.interiorAngle.toFixed(1)}°, Exterior = ${props.exteriorAngle.toFixed(1)}°</em>`;
});

// Property Match
function updatePropertyMatch() {
    const sides = parseInt(document.getElementById('match-polygon').value);
    const props = calculatePolygonProperties(sides);
    
    const polygonNames = {
        3: 'Triangle',
        4: 'Square',
        5: 'Pentagon',
        6: 'Hexagon',
        8: 'Octagon'
    };
    
    document.querySelector('#match-properties h4').textContent = `Properties of a regular ${polygonNames[sides]}:`;
    document.querySelector('.match-sides').textContent = sides;
    document.querySelector('.match-interior').textContent = props.interiorAngle.toFixed(0);
    document.querySelector('.match-sum').textContent = ((sides - 2) * 180);
    document.querySelector('.match-exterior').textContent = props.exteriorAngle.toFixed(0);
    
    // Draw polygon
    const canvas = document.getElementById('match-canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const points = createRegularPolygon(sides, centerX, centerY, radius);
    drawPolygon(ctx, points, 'rgba(100, 150, 255, 0.3)', '#001f5c', 2);
    
    for (let i = 0; i < sides; i++) {
        drawVertex(ctx, points[i].x, points[i].y, `V${i + 1}`);
    }
}

document.getElementById('match-polygon').addEventListener('change', updatePropertyMatch);

// Module 5: Polygon Art Creator
let artPolygons = [];

function updateArtControls() {
    const numPolygons = parseInt(document.getElementById('num-polygons').value);
    document.getElementById('num-polygons-value').textContent = numPolygons;
    
    const container = document.getElementById('polygon-controls');
    container.innerHTML = '';
    
    const colors = ['#ff6384', '#36a2eb', '#4bc0c0', '#ffcd56', '#9966ff'];
    
    // Keep existing polygons or create new ones
    while (artPolygons.length < numPolygons) {
        artPolygons.push({
            sides: 6,
            size: 1.0,
            rotation: 0,
            color: colors[artPolygons.length % colors.length]
        });
    }
    
    artPolygons = artPolygons.slice(0, numPolygons);
    
    artPolygons.forEach((poly, i) => {
        const group = document.createElement('div');
        group.className = 'polygon-control-group';
        group.innerHTML = `
            <h4>Polygon ${i + 1}</h4>
            <label>Sides: <span id="art-sides-${i}-value">${poly.sides}</span></label>
            <input type="range" id="art-sides-${i}" min="3" max="12" value="${poly.sides}" class="slider">
            
            <label>Size: <span id="art-size-${i}-value">${poly.size.toFixed(1)}</span></label>
            <input type="range" id="art-size-${i}" min="0.3" max="2" value="${poly.size}" step="0.1" class="slider">
            
            <label>Rotation: <span id="art-rotation-${i}-value">${poly.rotation}°</span></label>
            <input type="range" id="art-rotation-${i}" min="0" max="360" value="${poly.rotation}" step="15" class="slider">
        `;
        container.appendChild(group);
        
        // Add event listeners
        document.getElementById(`art-sides-${i}`).addEventListener('input', (e) => {
            artPolygons[i].sides = parseInt(e.target.value);
            document.getElementById(`art-sides-${i}-value`).textContent = artPolygons[i].sides;
            drawArt();
        });
        
        document.getElementById(`art-size-${i}`).addEventListener('input', (e) => {
            artPolygons[i].size = parseFloat(e.target.value);
            document.getElementById(`art-size-${i}-value`).textContent = artPolygons[i].size.toFixed(1);
            drawArt();
        });
        
        document.getElementById(`art-rotation-${i}`).addEventListener('input', (e) => {
            artPolygons[i].rotation = parseInt(e.target.value);
            document.getElementById(`art-rotation-${i}-value`).textContent = artPolygons[i].rotation;
            drawArt();
        });
    });
    
    drawArt();
}

function drawArt() {
    const canvas = document.getElementById('art-canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    artPolygons.forEach((poly) => {
        const radius = poly.size * 100;
        const points = [];
        
        for (let i = 0; i <= poly.sides; i++) {
            const angle = (i * 2 * Math.PI) / poly.sides - Math.PI / 2 + (poly.rotation * Math.PI / 180);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push({ x, y });
        }
        
        drawPolygon(ctx, points, poly.color + '66', poly.color, 2);
    });
}

document.getElementById('num-polygons').addEventListener('input', updateArtControls);

document.getElementById('random-art').addEventListener('click', () => {
    artPolygons.forEach(poly => {
        poly.sides = Math.floor(Math.random() * 10) + 3;
        poly.size = Math.random() * 1.7 + 0.3;
        poly.rotation = Math.floor(Math.random() * 24) * 15;
    });
    updateArtControls();
});

// Initialize on page load
window.addEventListener('load', () => {
    updateIntroModule();
    updateExplorerModule();
    updateCalculatorModule();
    updateQuizModule();
    updateArtControls();
});
