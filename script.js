// ===== TAB NAVIGATION =====
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    if (tabName === 'kuis') {
        loadQuiz();
    }
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-hidden');
}

/// ===== CALCULATOR =====
function calculatePath() {
    const input = document.getElementById('pathInput').value;
    const resultDiv = document.getElementById('calcResult');
    
    if (!input.trim()) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Mohon masukkan nilai!</div>';
        return;
    }
    
    const values = input.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (values.length === 0) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Format input tidak valid!</div>';
        return;
    }
    
    const total = values.reduce((sum, val) => sum + val, 0);
    
    let html = '<div class="result-box">';
    html += '<h4>Hasil Perhitungan:</h4>';
    values.forEach((val, idx) => {
        html += `<div class="result-item">Level ${idx}: ${val}</div>`;
    });
    html += `<div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-weight: 700; font-size: 1.2rem;">`;
    html += `Total Panjang Lintasan: ${total}`;
    html += `</div></div>`;
    
    resultDiv.innerHTML = html;
}

function calculateGraphWeight() {
    const input = document.getElementById('graphWeightInput').value;
    const resultDiv = document.getElementById('graphWeightResult');
    
    if (!input.trim()) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Mohon masukkan bobot sisi!</div>';
        return;
    }
    
    const weights = input.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (weights.length === 0) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Format input tidak valid!</div>';
        return;
    }
    
    const total = weights.reduce((sum, val) => sum + val, 0);
    const average = total / weights.length;
    const max = Math.max(...weights);
    const min = Math.min(...weights);
    
    let html = '<div class="result-box">';
    html += '<h4>Hasil Perhitungan Bobot Graf:</h4>';
    html += '<div style="display: grid; gap: 0.5rem; margin: 1rem 0;">';
    weights.forEach((val, idx) => {
        html += `<div class="result-item">Sisi ${idx + 1}: ${val}</div>`;
    });
    html += '</div>';
    html += '<div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">';
    html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Jumlah Sisi:</strong> ${weights.length}</div>`;
    html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Bobot Minimum:</strong> ${min}</div>`;
    html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Bobot Maksimum:</strong> ${max}</div>`;
    html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Rata-rata Bobot:</strong> ${average.toFixed(2)}</div>`;
    html += '</div>';
    html += `<div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-weight: 700; font-size: 1.2rem;">`;
    html += `Total Bobot Graf: ${total}`;
    html += `</div></div>`;
    
    resultDiv.innerHTML = html;
}

function calculateNodeDegree() {
    const input = document.getElementById('nodeDegreeInput').value;
    const resultDiv = document.getElementById('nodeDegreeResult');
    
    if (!input.trim()) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Mohon masukkan adjacency list!</div>';
        return;
    }
    
    try {
        // Parse format: A:B,C; B:A,C,D; C:A,B; D:B
        const lines = input.split(';').map(l => l.trim()).filter(l => l);
        const degrees = {};
        const edges = new Set();
        
        lines.forEach(line => {
            const [node, neighbors] = line.split(':').map(s => s.trim());
            if (!node || !neighbors) return;
            
            const neighborList = neighbors.split(',').map(n => n.trim()).filter(n => n);
            degrees[node] = neighborList.length;
            
            // Hitung edges (hindari duplikat)
            neighborList.forEach(neighbor => {
                const edge = [node, neighbor].sort().join('-');
                edges.add(edge);
            });
        });
        
        if (Object.keys(degrees).length === 0) {
            resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Format input tidak valid! Gunakan format: A:B,C; B:A,C,D</div>';
            return;
        }
        
        const totalDegree = Object.values(degrees).reduce((sum, deg) => sum + deg, 0);
        const maxDegree = Math.max(...Object.values(degrees));
        const minDegree = Math.min(...Object.values(degrees));
        
        let html = '<div class="result-box">';
        html += '<h4>Derajat Setiap Simpul:</h4>';
        html += '<div style="display: grid; gap: 0.5rem; margin: 1rem 0;">';
        Object.entries(degrees).sort().forEach(([node, degree]) => {
            html += `<div class="result-item">Simpul ${node}: ${degree}</div>`;
        });
        html += '</div>';
        html += '<div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">';
        html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Jumlah Simpul:</strong> ${Object.keys(degrees).length}</div>`;
        html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Jumlah Sisi:</strong> ${edges.size}</div>`;
        html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Derajat Minimum:</strong> ${minDegree}</div>`;
        html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Derajat Maksimum:</strong> ${maxDegree}</div>`;
        html += '</div>';
        html += `<div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-weight: 700; font-size: 1.2rem;">`;
        html += `Total Derajat: ${totalDegree}`;
        html += `</div></div>`;
        
        resultDiv.innerHTML = html;
    } catch (e) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Error parsing input! Pastikan format benar: A:B,C; B:A,C,D</div>';
    }
}

function calculateLeafNodes() {
    const input = document.getElementById('leafNodesInput').value;
    const resultDiv = document.getElementById('leafNodesResult');
    
    if (!input.trim()) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Mohon masukkan adjacency list!</div>';
        return;
    }
    
    try {
        // Parse format: A:B,C; B:A,C,D; C:A,B; D:B
        const lines = input.split(';').map(l => l.trim()).filter(l => l);
        const degrees = {};
        
        lines.forEach(line => {
            const [node, neighbors] = line.split(':').map(s => s.trim());
            if (!node) return;
            
            if (!neighbors || neighbors === '') {
                degrees[node] = 0;
            } else {
                const neighborList = neighbors.split(',').map(n => n.trim()).filter(n => n);
                degrees[node] = neighborList.length;
            }
        });
        
        if (Object.keys(degrees).length === 0) {
            resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Format input tidak valid! Gunakan format: A:B,C; B:A,C,D; D:</div>';
            return;
        }
        
        const leafNodes = Object.entries(degrees).filter(([_, degree]) => degree <= 1);
        const nonLeafNodes = Object.entries(degrees).filter(([_, degree]) => degree > 1);
        
        let html = '<div class="result-box">';
        html += '<h4>Analisis Daun (Leaf Nodes):</h4>';
        
        html += '<div style="background: #dcfce7; padding: 1rem; border-radius: 8px; margin: 1rem 0;">';
        html += '<h5 style="color: #047857; margin-bottom: 0.5rem;">🍃 Simpul Daun (Derajat ≤ 1):</h5>';
        if (leafNodes.length > 0) {
            leafNodes.forEach(([node, degree]) => {
                html += `<div class="result-item">Simpul ${node}: Derajat ${degree}</div>`;
            });
        } else {
            html += '<div style="color: #374151;">Tidak ada simpul daun</div>';
        }
        html += '</div>';
        
        html += '<div style="background: #e0e7ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">';
        html += '<h5 style="color: #4338ca; margin-bottom: 0.5rem;">🌿 Simpul Cabang (Derajat > 1):</h5>';
        if (nonLeafNodes.length > 0) {
            nonLeafNodes.forEach(([node, degree]) => {
                html += `<div class="result-item">Simpul ${node}: Derajat ${degree}</div>`;
            });
        } else {
            html += '<div style="color: #374151;">Tidak ada simpul cabang</div>';
        }
        html += '</div>';
        
        html += '<div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">';
        html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Total Simpul:</strong> ${Object.keys(degrees).length}</div>`;
        html += `<div style="color: #374151; margin: 0.5rem 0;"><strong>Jumlah Simpul Cabang:</strong> ${nonLeafNodes.length}</div>`;
        html += '</div>';
        
        html += `<div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-weight: 700; font-size: 1.2rem;">`;
        html += `Jumlah Simpul Daun: ${leafNodes.length}`;
        html += `</div></div>`;
        
        resultDiv.innerHTML = html;
    } catch (e) {
        resultDiv.innerHTML = '<div style="color: #ef4444; margin-top: 1rem;">Error parsing input! Pastikan format benar: A:B,C; B:A; D:</div>';
    }
}

// ===== QUIZ DATA =====
const quizData = [
    {
        question: "Apa yang dimaksud dengan akar (root) pada pohon?",
        options: [
            "Simpul yang tidak memiliki anak",
            "Simpul paling atas tanpa parent",
            "Simpul yang memiliki paling banyak anak",
            "Simpul di level terakhir"
        ],
        correct: 1,
        explanation: "Akar (root) adalah simpul paling atas pada pohon yang tidak memiliki parent. Dari akar inilah semua simpul lain berasal."
    },
    {
        question: "Berapa maksimal jumlah anak pada pohon biner?",
        options: ["1", "2", "3", "Tidak terbatas"],
        correct: 1,
        explanation: "Pohon biner adalah pohon di mana setiap simpul maksimal memiliki 2 anak (anak kiri dan anak kanan)."
    },
    {
        question: "Apa yang dimaksud dengan tinggi (height) pohon?",
        options: [
            "Jumlah total simpul dalam pohon",
            "Panjang lintasan terpanjang dari akar ke daun",
            "Jumlah level dalam pohon",
            "Jumlah anak dari akar"
        ],
        correct: 1,
        explanation: "Tinggi pohon adalah panjang lintasan terpanjang dari akar ke simpul daun yang paling jauh."
    },
    {
        question: "Dalam pohon biner pencarian (BST), di mana posisi nilai yang lebih kecil dari parent?",
        options: [
            "Di anak kanan",
            "Di anak kiri",
            "Di akar",
            "Tidak ada aturan khusus"
        ],
        correct: 1,
        explanation: "Dalam BST, nilai yang lebih kecil dari parent selalu berada di anak kiri, sedangkan nilai yang lebih besar berada di anak kanan."
    },
    {
        question: "Jika pohon biner lengkap memiliki tinggi 3, berapa total simpul maksimalnya?",
        options: ["7", "8", "15", "16"],
        correct: 2,
        explanation: "Rumus total simpul pohon lengkap: 2^(h+1) - 1. Dengan tinggi 3: 2^(3+1) - 1 = 16 - 1 = 15 simpul."
    }
];

let currentQuestion = 0;
let score = 0;

// ===== QUIZ FUNCTIONS =====
function loadQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    const q = quizData[currentQuestion];
    
    let html = `
        <div class="quiz-question">
            <h3 style="color: #047857; margin-bottom: 1rem;">Pertanyaan ${currentQuestion + 1} dari ${quizData.length}</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: #374151;">${q.question}</p>
            <div class="quiz-options">
    `;
    
    q.options.forEach((option, index) => {
        html += `<div class="quiz-option" onclick="selectAnswer(${index})" data-index="${index}">${option}</div>`;
    });
    
    html += `
            </div>
            <button class="quiz-btn" onclick="checkAnswer()" id="checkBtn" disabled>Cek Jawaban</button>
            <div id="quizResult"></div>
        </div>
    `;
    
    quizContent.innerHTML = html;
}

function selectAnswer(index) {
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector(`[data-index="${index}"]`).classList.add('selected');
    document.getElementById('checkBtn').disabled = false;
}

function checkAnswer() {
    const selected = document.querySelector('.quiz-option.selected');
    if (!selected) return;
    
    const selectedIndex = parseInt(selected.getAttribute('data-index'));
    const q = quizData[currentQuestion];
    const resultDiv = document.getElementById('quizResult');
    
    document.querySelectorAll('.quiz-option').forEach((opt, idx) => {
        opt.style.pointerEvents = 'none';
        if (idx === q.correct) {
            opt.classList.add('correct');
        } else if (idx === selectedIndex) {
            opt.classList.add('incorrect');
        }
    });
    
    const isCorrect = selectedIndex === q.correct;
    if (isCorrect) score++;
    
    let html = `<div class="quiz-result" style="background: ${isCorrect ? '#d1fae5' : '#fee2e2'}; border: 2px solid ${isCorrect ? '#10b981' : '#ef4444'};">`;
    html += `<h4 style="color: ${isCorrect ? '#047857' : '#991b1b'};">${isCorrect ? '✔ Benar!' : '✗ Salah!'}</h4>`;
    html += `<p style="color: #374151; line-height: 1.6;">${q.explanation}</p>`;
    html += `<button class="quiz-btn" onclick="nextQuestion()" style="margin-top: 1rem;">`;
    html += currentQuestion < quizData.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil';
    html += `</button></div>`;
    
    resultDiv.innerHTML = html;
    document.getElementById('checkBtn').style.display = 'none';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    const quizContent = document.getElementById('quizContent');
    const percentage = (score / quizData.length) * 100;
    const grade = percentage >= 80 ? 'Luar Biasa!' : percentage >= 60 ? 'Bagus!' : percentage >= 40 ? 'Cukup Baik' : 'Perlu Belajar Lagi';
    
    let html = `
        <div style="text-align: center; padding: 3rem;"> 
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">🎉 ${grade}</h2>
            <p style="font-size: 1.5rem; color: #374151; margin-bottom: 2rem;">
                Skor Anda: <strong style="color: #10b981;">${score} dari ${quizData.length}</strong>
            </p>
            <div style="width: 200px; height: 200px; margin: 2rem auto; border-radius: 50%; background: conic-gradient(#10b981 ${percentage}%, #e5e7eb ${percentage}%); display: flex; align-items: center; justify-content: center;">
                <div style="width: 160px; height: 160px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; color: #10b981;">
                    ${percentage}%
                </div>
            </div>
            <button class="quiz-btn" onclick="loadQuiz()" style="margin-top: 2rem;">Ulangi Kuis</button>
        </div>
    `;
    
    quizContent.innerHTML = html;
}

// ===== CHATBOT =====
let conversationHistory = [];

function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    container.classList.toggle('active');
    
    if (container.classList.contains('active') && !conversationHistory.length) {
        addBotMessage("Halo! Saya TreeLearn AI, asisten pembelajaran Anda. 🌳\n\nSaya siap membantu Anda memahami struktur data pohon. Anda bisa bertanya tentang:\n\n• Konsep dasar pohon\n• Pohon berakar dan jenis-jenisnya\n• Panjang lintasan\n• Binary Search Tree\n• Dan topik terkait lainnya!\n\nAda yang ingin Anda tanyakan?");
    }
}

function clearChat() {
    if (confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
        conversationHistory = [];
        document.getElementById('chat-messages').innerHTML = '';
        addBotMessage("Chat telah dihapus. Silakan mulai percakapan baru!");
    }
}

function addBotMessage(message) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message bot';
    messageEl.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
    `;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMessage(message) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message user';
    messageEl.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">${message}</div>
    `;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTyping() {
    const messagesDiv = document.getElementById('chat-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-message bot';
    typingEl.id = 'typing-indicator';
    typingEl.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    messagesDiv.appendChild(typingEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// ===== KNOWLEDGE BASE =====
const knowledgeBase = {
    'halo|hai|hi|hey': 'Halo! Senang bertemu dengan Anda! 😊 Saya TreeLearn AI, siap membantu Anda memahami struktur data pohon. Silakan tanya apa saja tentang pohon, BST, traversal, dan topik terkait!',
    
    'pohon|tree': 'Pohon (Tree) adalah struktur data hierarkis yang terdiri dari simpul-simpul (nodes) yang terhubung dengan sisi (edges). Setiap pohon memiliki:\n\n🔹 Akar (Root): Simpul paling atas\n🔹 Daun (Leaf): Simpul tanpa anak\n🔹 Cabang (Branch): Simpul yang memiliki anak\n🔹 Subtree: Pohon bagian dari pohon lebih besar\n\nAda yang ingin Anda tanyakan lebih detail?',
    
    'akar|root': 'Akar (Root) adalah simpul paling atas pada pohon yang tidak memiliki parent. Dari akar inilah semua simpul lain dalam pohon berasal. Akar adalah titik awal untuk melakukan traversal atau operasi lainnya pada pohon.',
    
    'daun|leaf': 'Daun (Leaf) adalah simpul yang tidak memiliki anak sama sekali. Daun berada di level paling bawah pohon dan merupakan titik akhir dari setiap cabang pohon.',
    
    'biner|binary': 'Pohon Biner adalah pohon di mana setiap simpul maksimal memiliki 2 anak (anak kiri dan anak kanan).\n\nJenis-jenis pohon biner:\n• Pohon Biner Lengkap: Semua level terisi penuh\n• Pohon Biner Sempurna: Semua daun di level yang sama\n• Binary Search Tree: Anak kiri < parent < anak kanan',
    
    'bst|binary search tree': 'Binary Search Tree (BST) adalah pohon biner khusus dengan aturan:\n\n✔ Semua nilai di anak kiri < nilai parent\n✔ Semua nilai di anak kanan > nilai parent\n✔ Tidak ada duplikat nilai\n\nKeuntungan BST:\n• Pencarian cepat: O(log n)\n• Insert dan delete efisien\n• Data terurut otomatis\n\nContoh: Jika parent = 10, anak kiri bisa 5, anak kanan bisa 15',
    
    'tinggi|height': 'Tinggi (Height) pohon adalah panjang lintasan terpanjang dari akar ke daun. Cara menghitung:\n\n• Pohon kosong: tinggi = -1\n• Pohon dengan 1 simpul: tinggi = 0\n• Pohon umum: tinggi = max(tinggi anak kiri, tinggi anak kanan) + 1\n\nContoh:\n```\n    A      Tinggi = 2\n   / \\\n  B   C    Level 1\n /\nD          Level 2\n```',
    
    'kedalaman|depth|level': 'Kedalaman (Depth) adalah panjang lintasan dari akar ke simpul tertentu.\n\n• Akar memiliki kedalaman 0\n• Anak dari akar memiliki kedalaman 1\n• Dan seterusnya...\n\nLevel adalah kelompok simpul dengan kedalaman yang sama.',
    
    'traversal|inorder|preorder|postorder': 'Traversal adalah cara mengunjungi semua simpul dalam pohon. Ada 3 jenis:\n\n🔹 Preorder (Root-Left-Right):\n   Kunjungi root → subtree kiri → subtree kanan\n   Contoh: A B D E C F\n\n🔹 Inorder (Left-Root-Right):\n   Kunjungi subtree kiri → root → subtree kanan\n   Pada BST menghasilkan urutan terurut!\n   Contoh: D B E A F C\n\n🔹 Postorder (Left-Right-Root):\n   Kunjungi subtree kiri → subtree kanan → root\n   Contoh: D E B F C A',
    
    'lintasan|path': 'Panjang Lintasan (Path Length) adalah jumlah sisi yang dilalui dari satu simpul ke simpul lain.\n\nTotal panjang lintasan = Σ (jumlah simpul di setiap level × kedalaman level)\n\nContoh pohon 3 level:\n• Level 0: 1 simpul × 0 = 0\n• Level 1: 2 simpul × 1 = 2\n• Level 2: 4 simpul × 2 = 8\nTotal = 10',
    
    'kompleksitas|big o|time complexity': 'Kompleksitas waktu operasi pohon:\n\n📊 Binary Search Tree (balanced):\n• Search: O(log n)\n• Insert: O(log n)\n• Delete: O(log n)\n\n📊 BST (worst case - tidak seimbang):\n• Search: O(n)\n• Insert: O(n)\n• Delete: O(n)\n\n📊 Traversal: O(n) - harus kunjungi semua simpul',
    
    'avl|balanced': 'AVL Tree adalah Binary Search Tree yang selalu seimbang (self-balancing).\n\nCiri-ciri AVL:\n• Perbedaan tinggi antara subtree kiri dan kanan maksimal 1\n• Rotasi otomatis saat insert/delete untuk menjaga keseimbangan\n• Operasi selalu O(log n)\n\nRotasi:\n• Left Rotation\n• Right Rotation\n• Left-Right Rotation\n• Right-Left Rotation',
    
    'rumus|formula': 'Rumus Penting Pohon:\n\n📐 Total simpul pohon lengkap:\n   2^(h+1) - 1\n\n📐 Tinggi dari jumlah simpul:\n   h = log₂(n+1) - 1\n\n📐 Maksimal simpul di level L:\n   2^L\n\n📐 Minimum tinggi dengan n simpul:\n   ⌈log₂(n+1)⌉ - 1',
    
    'implementasi|code|kode': 'Contoh implementasi Node pohon biner:\n\n```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.left = None\n        self.right = None\n\nclass BinaryTree:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, data):\n        # Implementasi insert\n        pass\n```\n\nIngin melihat implementasi operasi tertentu?',
    
    'perbedaan': 'Apa yang ingin Anda bandingkan?\n\n• Pohon vs Pohon Biner?\n• BST vs AVL Tree?\n• Inorder vs Preorder vs Postorder?\n• Stack vs Tree?\n\nSebutkan dua konsep yang ingin dibandingkan!',
    
    'contoh|example': 'Contoh Pohon Biner:\n\n```\n       10\n      /  \\\n     5    15\n    / \\   /\n   3   7 12\n```\n\nIni adalah BST karena:\n• 3,5,7 < 10 (di kiri)\n• 12,15 > 10 (di kanan)\n• 3 < 5 < 7\n• 12 < 15\n\nIngin contoh lain atau penjelasan lebih detail?',
    
    'terima kasih|thanks|makasih': 'Sama-sama! 😊 Senang bisa membantu Anda belajar struktur data pohon. Jangan ragu untuk bertanya lagi kapan saja. Selamat belajar! 🌳📚',
    
    'default': 'Maaf, saya belum memahami pertanyaan Anda dengan baik. Coba tanyakan tentang:\n\n🌳 Konsep dasar pohon\n🔢 Pohon biner dan BST\n📊 Traversal (inorder, preorder, postorder)\n📏 Tinggi, kedalaman, dan level\n⚡ Kompleksitas algoritma\n🔄 AVL Tree dan balancing\n\nAtau ketik "contoh" untuk melihat contoh pohon!'
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Cek setiap pattern di knowledge base
    for (const [pattern, response] of Object.entries(knowledgeBase)) {
        if (pattern === 'default') continue;
        
        const keywords = pattern.split('|');
        if (keywords.some(keyword => message.includes(keyword))) {
            return response;
        }
    }
    
    return knowledgeBase['default'];
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const message = input.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    input.style.height = 'auto';
    sendButton.disabled = true;
    
    conversationHistory.push({
        role: 'user',
        content: message
    });
    
    showTyping();
    
    // Simulasi delay untuk efek natural
    setTimeout(() => {
        removeTyping();
        const response = getBotResponse(message);
        
        conversationHistory.push({
            role: 'assistant',
            content: response
        });
        
        addBotMessage(response);
        sendButton.disabled = false;
    }, 800);
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Calculator enter key
    document.getElementById('pathInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculatePath();
        }
    });

    // Chatbot send button
    document.getElementById('send-button').addEventListener('click', sendMessage);
    
    // Chatbot enter key
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Chatbot textarea auto-resize
    document.getElementById('user-input').addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
    
});