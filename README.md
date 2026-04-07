PhishGuard – AI-Powered Phishing Detection Web App
Overview

PhishGuard is a full-stack web application that detects whether an email is phishing or safe using machine learning.

Users can paste email content into the app, and it returns:

Whether the email is phishing or not
Confidence score
Risk level (Safe / Suspicious / Dangerous)
Features
Real-time phishing detection
Clean and simple web interface
REST API backend
Machine learning-based predictions
Deployed frontend and backend
How It Works
User inputs email text
Text is cleaned and processed
TF-IDF vectorizer converts text into numerical features
XGBoost model predicts phishing probability
API returns structured response
Tech Stack
Backend
FastAPI
Uvicorn
Scikit-learn (TF-IDF Vectorizer)
XGBoost
Joblib
Frontend
React
Vite
Deployment
Railway (Backend)
Vercel (Frontend)
