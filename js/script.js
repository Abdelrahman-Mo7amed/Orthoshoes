document.addEventListener('DOMContentLoaded', () => {
    // Handle hamburger menu
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Handle share buttons
    const shareButtons = document.querySelectorAll('.btn-share');

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            navigator.clipboard.writeText(window.location.origin + '/' + link)
                .then(() => {
                    const originalText = this.textContent;
                    this.textContent = "Copied link";
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 4000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
    });

    // JavaScript for the scroll-to-top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Handle Sign In Form Submission
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (email && password) {
                // Retrieve stored user data
                const storedUser = JSON.parse(localStorage.getItem('user'));

                if (storedUser && storedUser.email === email && storedUser.password === password) {
                    alert(`Sign In successful! Welcome back, ${storedUser.firstName}`);
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                } else {
                    alert('Invalid email or password');
                }
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Example password strength check function
    function isPasswordStrong(password) {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    // Handle Sign Up Form Submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (firstName && lastName && email && password) {
                if (!isPasswordStrong(password)) {
                    alert('Password must be at least 8 characters long, include at least one letter, one number, and one special character.');
                    return;
                }

                const user = {
                    firstName,
                    lastName,
                    email,
                    password
                };

                // Store user data in local storage
                localStorage.setItem('user', JSON.stringify(user));

                alert('Sign Up successful! You can now sign in.');
                window.location.href = 'signin.html'; // Redirect to sign in
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.querySelector('#signin-form');

    // Sign In functionality
    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dashboardType = document.getElementById('dashboard-type').value;

            // Retrieve user data from localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));

            // Authenticate user
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                // Redirect based on selected dashboard type
                if (dashboardType === 'player') {
                    window.location.href = 'player-dashboard.html';
                } else if (dashboardType === 'team') {
                    window.location.href = 'team-dashboard.html';
                } else {
                    alert('Please select a dashboard type.');
                }
            } else {
                alert('Invalid email or password.');
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Define AI responses with exact match
    const aiResponses = {
        "Hello":"Hello, Mohamed. How i can help you today?",
        "Thank u":"You are welcome!",
        "How can I improve my performance in the next match?": "Focus on your positioning and try to create more opportunities by making diagonal runs into the box. Consider practicing your finishing in training sessions to enhance your accuracy.",
        "What should I work on in my next training session?": "Work on your ball control and dribbling skills. Incorporate more high-intensity interval training to improve your stamina.",
        "How can I avoid injuries?": "Ensure you warm up properly before each session and maintain a balanced diet. Regularly check your footwear and consider incorporating stretching and strengthening exercises into your routine.",
        "How did I perform in the last match?": "In your last match, you showed excellent speed and agility, with a notable increase in the number of successful dribbles and key passes. However, your shot accuracy was slightly lower than usual.",
        "What were my key stats from the last session?": "In your last session, you covered 10 km, with an average heart rate of 150 bpm. You completed 80% of your passes successfully and had a shot accuracy of 70%.",
        "What areas did I excel in last session?": "You excelled in maintaining high stamina and successfully completing a high percentage of your passes. Your positional awareness was also commendable.",
        "What can I improve based on last session?": "Work on improving your shot accuracy and focus on finishing drills. Also, try to enhance your defensive positioning during drills.",
        "How do I analyze my performance data?": "Review your performance data regularly by looking at key metrics such as distance covered, heart rate, and accuracy of passes. Compare these with previous sessions to identify trends and areas for improvement.",
        "What should I focus on for the upcoming match?": "Focus on refining your tactical awareness and improving your decision-making under pressure. Work on specific aspects of your game that were highlighted as areas for improvement in previous matches.",
        "How can I boost my endurance?": "Incorporate interval training into your routine and gradually increase the intensity of your workouts. Ensure you are also following a balanced diet to support your training.",
        "What is the best way to recover after a match?": "Ensure proper hydration and nutrition post-match. Incorporate stretching and foam rolling into your recovery routine and consider a light recovery session to maintain flexibility.",
        "How do I set realistic performance goals?": "Analyze your past performance data and set goals based on areas where you can improve. Ensure your goals are Specific, Measurable, Achievable, Relevant, and Time-bound (SMART).",
        "How often should I review my performance data?": "Review your performance data after each session and match to track progress and adjust your training plan as needed. Regular reviews help in identifying patterns and making necessary adjustments.",
        "How can I enhance my tactical awareness?": "Study match footage to understand different tactical setups and positional play. Practice scenarios that challenge your decision-making and spatial awareness during training.",
        "What type of drills are best for improving dribbling?": "Incorporate cone drills, one-on-one scenarios, and speed dribbling exercises into your training. Focus on both control and acceleration during these drills.",
        "How can I improve my passing accuracy?": "Practice passing drills with different distances and speeds. Focus on technique and aim to improve your vision and decision-making during practice.",
        "What are some effective ways to manage match anxiety?": "Practice relaxation techniques such as deep breathing and visualization. Prepare thoroughly for the match and maintain a positive mindset to manage anxiety.",
        "How do I know if I'm overtraining?": "Signs of overtraining include persistent fatigue, decreased performance, increased irritability, and frequent injuries. Monitor these signs and ensure adequate rest and recovery.",
        "What are the benefits of strength training for a football player?": "Strength training helps in improving power, stability, and injury prevention. It enhances overall physical performance and can contribute to better performance on the field.",
        "How can I improve my agility on the field?": "Incorporate agility drills such as ladder drills, cone drills, and change-of-direction exercises into your training regimen. Focus on quick, controlled movements.",
        "What are the best practices for maintaining a balanced diet?": "Ensure your diet includes a mix of carbohydrates, proteins, and healthy fats. Stay hydrated and consume a variety of fruits and vegetables for essential nutrients.",
        "How can I better understand my performance analytics?": "Use performance analytics tools to visualize data such as heatmaps, distance covered, and key metrics. Analyze trends and patterns to gain insights into your performance.",
        "How can I stay motivated during off-seasons?": "Set specific goals for the off-season and create a structured training plan. Engage in activities you enjoy and track your progress to maintain motivation."
    };

    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', type);
        messageDiv.innerHTML = `<p><strong>${type === 'user' ? 'You' : 'AI Assistant'}:</strong> ${content}</p>`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    function getAIResponse(userMessage) {
        // Handle userMessage to match AI responses
        let response = aiResponses[userMessage];
        if (!response) {
            response = "I'm not sure how to answer that. Can you ask something else?";
        }
        return response;
    }

    sendBtn.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            const aiMessage = getAIResponse(userMessage);
            addMessage(aiMessage, 'ai');
            userInput.value = ''; // Clear the input field
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            sendBtn.click(); // Trigger send button click
        }
    });
});
