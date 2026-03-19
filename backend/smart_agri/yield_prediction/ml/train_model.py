import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Base path
BASE_DIR = os.path.dirname(__file__)

# CSV path
csv_path = os.path.join(BASE_DIR, 'crop_yield.csv')

# Load CSV
df = pd.read_csv(csv_path)

print(f"Original dataset size: {len(df)} rows")

# Clean column names
df.columns = df.columns.str.strip()

print("Columns:", df.columns.tolist())

# Keep required columns
df = df[['State', 'District', 'Crop', 'Year', 'Season', 'Area', 'Yield']]

# Drop missing values
df = df.dropna()

print(f"After dropping missing values: {len(df)} rows")

# Convert Year (e.g. 2001-02 -> 2001)
df['Year'] = df['Year'].astype(str).str.split('-').str[0].astype(int)

# Convert numeric columns
df['Area'] = pd.to_numeric(df['Area'], errors='coerce')
df['Yield'] = pd.to_numeric(df['Yield'], errors='coerce')

# Drop invalid rows again
df = df.dropna()

print(f"After data cleaning: {len(df)} rows")

# Sample for faster training (use 20% of data)
df_sample = df.sample(frac=0.2, random_state=42)
print(f"Using sample size: {len(df_sample)} rows")

# Features and target
X = df_sample[['State', 'District', 'Crop', 'Year', 'Season', 'Area']]
y = df_sample['Yield']

# Column groups
categorical_features = ['State', 'District', 'Crop', 'Season']
numeric_features = ['Year', 'Area']

# Preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
        ('num', 'passthrough', numeric_features)
    ]
)

# Pipeline model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(
        n_estimators=50,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    ))
])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training set size: {len(X_train)} rows")
print(f"Test set size: {len(X_test)} rows")

# Train
print("Starting model training...")
model.fit(X_train, y_train)
print("Training completed!")

# Predict
y_pred = model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MAE: {mae}")
print(f"R2 Score: {r2}")

# Save model
model_path = os.path.join(BASE_DIR, 'yield_model.pkl')
joblib.dump(model, model_path)

print(f"Model saved at: {model_path}")