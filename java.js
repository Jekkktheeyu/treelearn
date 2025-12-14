var quizQuestions = [
            {
                question: "Apa yang dimaksud dengan pohon dalam struktur data?",
                options: [
                    "Struktur data hierarkis dengan simpul akar",
                    "Struktur data linear seperti array",
                    "Struktur data yang berbentuk lingkaran",
                    "Struktur data tanpa hubungan"
                ],
                correct: 0,
                explanation: {
                    correct: "Benar! Pohon adalah struktur data hierarkis yang memiliki simpul akar (root) sebagai simpul paling atas. Dari akar ini, terbentuk hubungan parent-child yang membentuk hierarki seperti pohon terbalik.",
                    incorrect: "Pohon adalah struktur data hierarkis, bukan linear atau circular. Ciri khasnya adalah memiliki simpul akar (root) dan hubungan parent-child yang membentuk hierarki."
                }
            },
            {
                question: "Berapa maksimal anak yang dimiliki simpul pada pohon biner?",
                options: ["1", "2", "3", "Tidak terbatas"],
                correct: 1,
                explanation: {
                    correct: "Tepat sekali! Pohon biner adalah pohon dimana setiap simpul maksimal memiliki 2 anak (left child dan right child). Inilah yang membedakan pohon biner dengan pohon jenis lainnya.",
                    incorrect: "Pohon biner memiliki maksimal 2 anak per simpul. 'Biner' berarti dua, sehingga setiap simpul hanya bisa memiliki paling banyak 2 anak (left dan right child)."
                }
            },
            {
                question: "Apa yang dimaksud dengan daun pada pohon?",
                options: [
                    "Simpul yang memiliki banyak anak",
                    "Simpul akar pohon",
                    "Simpul yang tidak memiliki anak",
                    "Simpul di tengah pohon"
                ],
                correct: 2,
                explanation: {
                    correct: "Sempurna! Daun (leaf) adalah simpul terminal yang tidak memiliki anak sama sekali. Ini adalah simpul paling ujung dalam pohon, seperti daun pada pohon alami.",
                    incorrect: "Daun (leaf) adalah simpul yang tidak memiliki anak. Simpul ini berada di ujung pohon dan tidak memiliki simpul lain di bawahnya."
                }
            },
            {
                question: "Tinggi pohon adalah...",
                options: [
                    "Jumlah total simpul",
                    "Panjang lintasan terpanjang dari akar ke daun",
                    "Jumlah daun pada pohon",
                    "Jumlah level dikali 2"
                ],
                correct: 1,
                explanation: {
                    correct: "Bagus! Tinggi pohon adalah panjang lintasan terpanjang dari akar ke daun terjauh. Ini mengukur 'kedalaman' maksimum pohon dan sangat penting untuk analisis kompleksitas algoritma.",
                    incorrect: "Tinggi pohon diukur dari panjang lintasan terpanjang dari akar ke daun. Bukan jumlah simpul atau level, melainkan berapa banyak sisi yang harus dilalui ke daun terjauh."
                }
            },
            {
                question: "Pada pohon berakar, simpul yang tidak memiliki parent disebut?",
                options: ["Daun", "Cabang", "Akar", "Subtree"],
                correct: 2,
                explanation: {
                    correct: "Benar sekali! Akar (root) adalah simpul khusus yang tidak memiliki parent dan menjadi titik awal dari seluruh pohon. Semua simpul lain adalah keturunan dari akar.",
                    incorrect: "Akar (root) adalah simpul yang tidak memiliki parent. Ini adalah simpul paling atas yang menjadi 'induk tertinggi' dari semua simpul lainnya dalam pohon."
                }
            }
        ];

        var currentQuestion = 0;
        var quizScore = 0;
        var answeredQuestions = [];
        var selectedAnswer = null;

        function toggleMenu() {
            var sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
        }

        function switchTab(tabName) {
            var tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });

            document.getElementById(tabName).classList.add('active');

            var buttons = document.querySelectorAll('.nav-btn');
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            var activeBtn = document.querySelector('.nav-btn[data-tab="' + tabName + '"]');
            if (activeBtn) {
                activeBtn.classList.add('active');
            }

            var sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('show');

            if (tabName === 'kuis') {
                renderQuiz();
            }
        }

        function renderQuiz() {
            var quizContent = document.getElementById('quizContent');

            if (currentQuestion >= quizQuestions.length) {
                var resultMessage = "";
                if (quizScore === quizQuestions.length) {
                    resultMessage = "Sempurna! Anda menguasai materi dengan baik! 🌟";
                } else if (quizScore >= quizQuestions.length * 0.6) {
                    resultMessage = "Bagus! Terus tingkatkan pemahaman Anda! 💪";
                } else {
                    resultMessage = "Semangat! Coba pelajari materi lagi ya! 📚";
                }

                quizContent.innerHTML = '<div class="result-card">' +
                    '<svg viewBox="0 0 24 24">' +
                    '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>' +
                    '<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>' +
                    '<path d="M4 22h16"/>' +
                    '<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>' +
                    '<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>' +
                    '<path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>' +
                    '</svg>' +
                    '<h3>Kuis Selesai! 🎉</h3>' +
                    '<p style="font-size: 1.25rem; color: #7c3aed; margin: 1rem 0;">' +
                    'Skor Anda: <span class="result-score">' + quizScore + '</span> / ' + quizQuestions.length +
                    '</p>' +
                    '<p style="font-size: 1.125rem; color: #374151;">' + resultMessage + '</p>' +
                    '<button class="retry-btn" onclick="resetQuiz()">Ulangi Kuis</button>' +
                    '</div>';
                return;
            }

            var q = quizQuestions[currentQuestion];
            var progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

            var optionsHtml = '';
            for (var i = 0; i < q.options.length; i++) {
                optionsHtml += '<button class="answer-btn" onclick="handleAnswer(' + i + ')" id="answer-' + i + '">' +
                    '<span>' + q.options[i] + '</span>' +
                    '</button>';
            }

            quizContent.innerHTML = '<div class="quiz-progress">' +
                '<div class="quiz-header">' +
                '<span style="color: #7c3aed; font-weight: 600;">Pertanyaan ' + (currentQuestion + 1) + ' dari ' + quizQuestions.length + '</span>' +
                '<span class="score-badge">Skor: ' + quizScore + '</span>' +
                '</div>' +
                '<div class="progress-bar">' +
                '<div class="progress-fill" style="width: ' + progress + '%"></div>' +
                '</div>' +
                '</div>' +
                '<div class="question-card">' +
                '<h3>' + q.question + '</h3>' +
                '<div id="answersContainer">' + optionsHtml + '</div>' +
                '<div id="explanationContainer"></div>' +
                '</div>';
        }

        function handleAnswer(index) {
            if (selectedAnswer !== null) return;

            selectedAnswer = index;
            var q = quizQuestions[currentQuestion];
            var isCorrect = index === q.correct;

            if (answeredQuestions.indexOf(currentQuestion) === -1) {
                answeredQuestions.push(currentQuestion);
                if (isCorrect) {
                    quizScore++;
                }
            }

            var buttons = document.querySelectorAll('.answer-btn');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
                if (i === q.correct) {
                    buttons[i].classList.add('correct');
                    buttons[i].innerHTML = '<span>' + q.options[i] + '</span>' +
                        '<span class="answer-icon">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e">' +
                        '<polyline points="20 6 9 17 4 12"/>' +
                        '</svg>' +
                        '</span>';
                } else if (i === index) {
                    buttons[i].classList.add('incorrect');
                    buttons[i].innerHTML = '<span>' + q.options[i] + '</span>' +
                        '<span class="answer-icon">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444">' +
                        '<line x1="18" y1="6" x2="6" y2="18"/>' +
                        '<line x1="6" y1="6" x2="18" y2="18"/>' +
                        '</svg>' +
                        '</span>';
                }
            }

            var explanation = isCorrect ? q.explanation.correct : q.explanation.incorrect;
            var explanationClass = isCorrect ? 'correct' : 'incorrect';
            var explanationTitle = isCorrect ? '✓ Jawaban Benar!' : '✗ Jawaban Salah';
            
            document.getElementById('explanationContainer').innerHTML = '<div class="explanation-box ' + explanationClass + '">' +
                '<strong>' + explanationTitle + '</strong>' +
                '<p style="color: #374151; line-height: 1.6;">' + explanation + '</p>' +
                '</div>';

            setTimeout(function() {
                currentQuestion++;
                selectedAnswer = null;
                renderQuiz();
            }, 4000);
        }

        function resetQuiz() {
            currentQuestion = 0;
            quizScore = 0;
            answeredQuestions = [];
            selectedAnswer = null;
            renderQuiz();
        }

        function calculatePath() {
            var input = document.getElementById('pathInput').value;
            var levels = input.split(',').map(function(num) {
                return parseInt(num.trim());
            }).filter(function(num) {
                return !isNaN(num);
            });

            var resultDiv = document.getElementById('calcResult');

            if (levels.length === 0) {
                resultDiv.innerHTML = '<div style="background: #fee2e2; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; border: 2px solid #ef4444;">' +
                    '<p style="color: #991b1b; font-weight: 600;">❌ Masukkan angka yang valid</p>' +
                    '</div>';
                return;
            }

            var totalPath = levels.reduce(function(sum, val) {
                return sum + val;
            }, 0);
            var average = (totalPath / levels.length).toFixed(2);

            resultDiv.innerHTML = '<div style="background: white; padding: 1.5rem; border-radius: 12px; border: 2px solid #fdba74; margin-top: 1.5rem;">' +
                '<h4 style="color: #7c2d12; font-size: 1.5rem; margin-bottom: 1rem;">Hasil Perhitungan:</h4>' +
                '<div class="result-grid">' +
                '<div class="result-item" style="background: #fff7ed;">' +
                '<p>Jumlah Level</p>' +
                '<div class="result-value" style="color: #f97316;">' + levels.length + '</div>' +
                '</div>' +
                '<div class="result-item" style="background: #fef2f2;">' +
                '<p>Total Lintasan</p>' +
                '<div class="result-value" style="color: #ef4444;">' + totalPath + '</div>' +
                '</div>' +
                '<div class="result-item" style="background: #fdf2f8;">' +
                '<p>Rata-rata</p>' +
                '<div class="result-value" style="color: #ec4899;">' + average + '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }
            
        renderQuiz();