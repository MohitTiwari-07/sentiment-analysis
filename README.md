# Sentiment Analysis Web Application

A web application that allows users to analyze the sentiment of text using both VADER and TextBlob sentiment analysis tools.

## Features

- Simple and intuitive user interface
- Real-time sentiment analysis
- Detailed breakdown of sentiment scores
- Responsive design for all devices
- Analysis using both VADER and TextBlob algorithms
- Flat directory structure for easy deployment

## Live Demo

The application is deployed on Render and can be accessed [here](#) (link will be available after deployment).

## Tools Used

- **VADER (Valence Aware Dictionary and Sentiment Reasoner)**: A lexicon and rule-based sentiment analysis tool specifically attuned to sentiments expressed in social media.
- **TextBlob**: A Python library for processing textual data, offering simple API for common NLP tasks including sentiment analysis.

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python, Flask
- **Deployment**: Render

## Project Structure

All files are kept in a single directory for simplicity:
- `app.py` - Flask server with sentiment analysis logic
- `index.html` - HTML template for the frontend
- `styles.css` - CSS styling
- `script.js` - JavaScript for frontend functionality
- `requirements.txt` - Python dependencies
- `Procfile` - Configuration for deployment

## How to Use

1. Enter or paste your text in the text area
2. Click "Analyze Sentiment"
3. View the analysis results, including:
   - Overall sentiment classification (Positive, Negative, or Neutral)
   - VADER sentiment scores (positive, negative, neutral, compound)
   - TextBlob polarity and subjectivity scores

## Local Development

### Requirements

- Python 3.8 or higher
- pip package manager

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/mohitsaini7407/sentiment-analysis-web.git
   cd sentiment-analysis-web
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python app.py
   ```

4. Open your browser and go to `http://localhost:5000`

## Deployment

The application is designed to be easily deployed on Render or similar platforms:

1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Use the following settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Created By

[Mohit Tiwari](https://github.com/MohitTiwari-07)
