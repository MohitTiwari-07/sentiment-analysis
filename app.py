from flask import Flask, render_template, request, jsonify, send_from_directory
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob
import os

# Download necessary NLTK data
nltk.download('vader_lexicon', quiet=True)

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/styles.css')
def styles():
    return send_from_directory('.', 'styles.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    if request.method == 'POST':
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # VADER Sentiment Analysis
        vader_analyzer = SentimentIntensityAnalyzer()
        vader_scores = vader_analyzer.polarity_scores(text)
        
        # TextBlob Sentiment Analysis
        blob = TextBlob(text)
        textblob_polarity = blob.sentiment.polarity
        textblob_subjectivity = blob.sentiment.subjectivity
        
        # Determine overall sentiment
        compound_score = vader_scores['compound']
        if compound_score >= 0.05:
            overall_sentiment = "Positive"
        elif compound_score <= -0.05:
            overall_sentiment = "Negative"
        else:
            overall_sentiment = "Neutral"
        
        result = {
            'text': text,
            'overall_sentiment': overall_sentiment,
            'vader': {
                'positive': vader_scores['pos'],
                'negative': vader_scores['neg'],
                'neutral': vader_scores['neu'],
                'compound': vader_scores['compound']
            },
            'textblob': {
                'polarity': textblob_polarity,
                'subjectivity': textblob_subjectivity
            }
        }
        
        return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') 