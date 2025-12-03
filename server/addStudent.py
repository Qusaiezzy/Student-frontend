import pandas as pd
from pymongo import MongoClient

# ------------------------------
# 1. MONGO CONNECTION
# ------------------------------
client = MongoClient("mongodb+srv://qusaiezzy53_db_user:qusaiezzy53_db_password@cluster0.yt6f7lm.mongodb.net/?appName=Cluster0")
db = client["test"]
collection = db["users"]   # your collection name

# ------------------------------
# 2. READ EXCEL FILE
# ------------------------------
excel_path = "student_data - Copy.xlsx"   # change filename if needed

df = pd.read_excel(excel_path)

# Expected columns: rollNumber, studentName
# Check if correct columns exist
required_columns = {"rollNumber", "password"}

if not required_columns.issubset(df.columns):
    print("❌ Excel must have columns: rollNumber, password")
    print("Columns found:", df.columns.tolist())
    exit()

# Convert dataframe to dictionary
students = df.to_dict(orient="records")

# ------------------------------
# 3. INSERT INTO MONGO
# ------------------------------
try:
    result = collection.insert_many(students)
    print(f"✅ Successfully inserted {len(result.inserted_ids)} students.")
except Exception as e:
    print("❌ Error inserting data:", e)
