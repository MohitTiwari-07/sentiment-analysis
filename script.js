document.addEventListener('DOMContentLoaded', function() {
    const sentimentForm = document.getElementById('sentiment-form');
    const resultsSection = document.getElementById('results-section');
    
    sentimentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const textInput = document.getElementById('text-input').value.trim();
        
        if (!textInput) {
            alert('Please enter text to analyze');
            return;
        }
        
        try {
            // Show loading state
            document.querySelector('button[type="submit"]').innerHTML = 
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Analyzing...';
            document.querySelector('button[type="submit"]').disabled = true;
            
            // Make API request
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textInput })
            });
            
            if (!response.ok) {
                throw new Error('Error analyzing sentiment');
            }
            
            const result = await response.json();
            
            // Update the UI with results
            updateResults(result);
            
            // Show results section
            resultsSection.style.display = 'block';
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to analyze sentiment. Please try again.');
        } finally {
            // Reset button state
            document.querySelector('button[type="submit"]').innerHTML = 'Analyze Sentiment';
            document.querySelector('button[type="submit"]').disabled = false;
        }
    });
    
    function updateResults(data) {
        // Update overall sentiment
        const overallSentiment = document.getElementById('overall-sentiment');
        const sentimentEmoji = document.getElementById('sentiment-emoji');
        
        overallSentiment.textContent = `${data.overall_sentiment} Sentiment`;
        
        // Set emoji and color based on sentiment
        if (data.overall_sentiment === 'Positive') {
            sentimentEmoji.textContent = '😊';
            overallSentiment.className = 'mb-2 positive-text';
        } else if (data.overall_sentiment === 'Negative') {
            sentimentEmoji.textContent = '😞';
            overallSentiment.className = 'mb-2 negative-text';
        } else {
            sentimentEmoji.textContent = '😐';
            overallSentiment.className = 'mb-2 neutral-text';
        }
        
        // Update VADER results
        document.getElementById('vader-positive-value').textContent = data.vader.positive.toFixed(2);
        document.getElementById('vader-negative-value').textContent = data.vader.negative.toFixed(2);
        document.getElementById('vader-neutral-value').textContent = data.vader.neutral.toFixed(2);
        document.getElementById('vader-compound').textContent = data.vader.compound.toFixed(2);
        
        // Update progress bars for VADER
        document.getElementById('vader-positive').style.width = `${data.vader.positive * 100}%`;
        document.getElementById('vader-negative').style.width = `${data.vader.negative * 100}%`;
        document.getElementById('vader-neutral').style.width = `${data.vader.neutral * 100}%`;
        
        // Update TextBlob results
        document.getElementById('textblob-polarity').textContent = data.textblob.polarity.toFixed(2);
        document.getElementById('textblob-subjectivity').textContent = data.textblob.subjectivity.toFixed(2);
        
        // Update progress bars for TextBlob
        // Polarity is -1 to 1, so we need to normalize to 0-100%
        const polarityPercentage = ((data.textblob.polarity + 1) / 2) * 100;
        document.getElementById('textblob-polarity-bar').style.width = `${polarityPercentage}%`;
        
        // Subjectivity is already 0 to 1
        document.getElementById('textblob-subjectivity-bar').style.width = `${data.textblob.subjectivity * 100}%`;
    }
}); 