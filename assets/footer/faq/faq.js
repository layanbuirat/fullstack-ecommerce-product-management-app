async function loadFAQ() {
    try {
        console.log('Loading FAQ...');
        
        // Use port 3001 instead of 5000
        const response = await fetch('http://localhost:3001/api/faq');
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const faqData = await response.json();
        console.log('Data received:', faqData);
        
        displayFAQ(faqData);
        
    } catch (error) {
        console.error('Error loading FAQ:', error);
        document.getElementById('faqContent').innerHTML = `
            <div class="alert alert-danger text-center">
                <h4>Error loading FAQ</h4>
                <p>${error.message}</p>
                <button class="btn btn-primary mt-2" onclick="loadFAQ()">Try Again</button>
            </div>
        `;
    }
}

async function searchFAQ() {
    const searchTerm = document.getElementById('faqSearch').value.trim();
    
    try {
        console.log('Searching for:', searchTerm);
        
        if (searchTerm === '') {
            loadFAQ();
            return;
        }

        // Use port 3001 for search too
        const response = await fetch(`http://localhost:3001/api/faq/search?q=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const faqData = await response.json();
        console.log('Search results:', faqData);
        
        displayFAQ(faqData);
        
    } catch (error) {
        console.error('Search error:', error);
        localSearch(searchTerm);
    }
}

function localSearch(searchTerm) {
    // Use port 3001 for local search fallback
    fetch('http://localhost:3001/api/faq')
        .then(response => response.json())
        .then(faqData => {
            const filteredData = faqData.filter(q => 
                q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            
            if (filteredData.length === 0) {
                document.getElementById('faqContent').innerHTML = `
                    <div class="alert alert-warning text-center">
                        <h4>No results found</h4>
                        <p>No results matching "${searchTerm}"</p>
                        <button class="btn btn-primary" onclick="loadFAQ()">Show all questions</button>
                    </div>
                `;
            } else {
                displayFAQ(filteredData);
            }
        })
        .catch(error => {
            console.error('Error in local search:', error);
        });
}

function toggleAnswer(questionId) {
    const answer = document.getElementById(`answer-${questionId}`);
    if (answer) {
        answer.classList.toggle('show');
        
        const icon = answer.previousElementSibling.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
    }
}

function displayFAQ(faqData) {
    const faqContent = document.getElementById('faqContent');
    
    // Check if data is array (from /api/faq) or object (from search)
    let questions = Array.isArray(faqData) ? faqData : (faqData.questions || faqData);
    
    if (!questions || questions.length === 0) {
        faqContent.innerHTML = `
            <div class="alert alert-info text-center">
                <h4>No questions available</h4>
                <p>Please check back later or contact our support team.</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="row mb-4">
            <div class="col-12 text-center">
                <h2 class="text-primary">Frequently Asked Questions</h2>
                <p class="text-muted">Find answers to common questions about our products and services</p>
            </div>
        </div>
    `;

    // Group by category if data has categories, otherwise show all questions
    if (faqData.categories) {
        // Data with categories structure
        faqData.categories.forEach(category => {
            html += `
                <div class="faq-category mb-5">
                    <h3 class="mb-4 text-dark border-bottom pb-2">${category.name}</h3>
                    <div class="faq-items">
            `;
            
            category.questions.forEach((question, index) => {
                const questionId = `q-${category.name.replace(/\s+/g, '-').toLowerCase()}-${index}`;
                html += `
                    <div class="faq-item">
                        <button class="faq-question" onclick="toggleAnswer('${questionId}')">
                            ${question.question}
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="answer-${questionId}" class="faq-answer">
                            <p>${question.answer}</p>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
    } else {
        // Simple array structure (from /api/faq endpoint)
        html += `
            <div class="faq-category mb-5">
                <h3 class="mb-4 text-dark border-bottom pb-2">General Questions</h3>
                <div class="faq-items">
        `;
        
        questions.forEach((question, index) => {
            const questionId = `q-${index}`;
            html += `
                <div class="faq-item">
                    <button class="faq-question" onclick="toggleAnswer('${questionId}')">
                        ${question.question}
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div id="answer-${questionId}" class="faq-answer">
                        <p>${question.answer}</p>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }

    faqContent.innerHTML = html;
}

// Add contact info function
function updateContactInfo(contactInfo) {
    if (contactInfo) {
        if (contactInfo.phone) {
            document.getElementById('contactPhone').textContent = contactInfo.phone;
        }
        if (contactInfo.email) {
            document.getElementById('contactEmail').textContent = contactInfo.email;
        }
        if (contactInfo.hours) {
            document.getElementById('contactHours').textContent = contactInfo.hours;
        }
    }
}

// Initialize FAQ when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFAQ();
    
    // Add enter key support for search
    document.getElementById('faqSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchFAQ();
        }
    });
});